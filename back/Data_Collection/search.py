import elasticsearch
from elasticsearch_dsl import Search
from elasticsearch import Elasticsearch
from .models import Adjutstement

ELASTIC_HOST = 'http://localhost:9200/'

# Create the client instance
client = Elasticsearch(
    [ELASTIC_HOST],
    basic_auth=('nermine', '17161670')
)
def lookup(query, index='juridical_texts', fields=['id_text', 'type_text', 'description', 'extracted_text'], sort_by='relevance',source=None,year=None):
    if not query:
        return
    
    # Définition du tri en fonction du paramètre sort_by pour avoir le tri pertinence ou par date
    if sort_by == 'relevance':
        sort = '_score'  # Tri par pertinence
    elif sort_by == 'publication_date':
        sort = {'publication_date': {'order': 'desc'}}  # Tri par date de publication
    else:
        sort = '_score'  # Tri par défaut (pertinence)
    
    # Construction de la requête Elasticsearch avec le tri
    s = Search(index=index).using(client).query(
        "multi_match", fields=fields, fuzziness='AUTO', query=query
    ).sort(sort)  # Tri par pertinence ou date de publication
    if source:  #tri par institue de publication 
        print(f"Filtering by source: {source}")
        s = s.filter('term', source=source)
    if year:#filtre par années
        s = s.filter('range', publication_date={'gte': year + '-01-01', 'lte': year + '-12-31'})

    # Exécuter la recherche Elasticsearch
    results = s.execute()
    q_results = []

    for hit in results:
        # Retrieve adjustments related to the current JuridicalText
        adjustments = get_adjustments(hit.id_text)
        
        data = {
            "id_text": hit.id_text,
            "description": hit.description,
            "type_text": hit.type_text,
            "signature_date" : hit.signature_date,
            "publication_date": hit.publication_date,
            "jt_number": hit.jt_number,
            "source": hit.source,
            "official_journal_page": hit.official_journal_page,
            "text_file_content": hit.extracted_text,
            "adjustments": adjustments,  # Include adjustments data
        }
        q_results.append(data)
    return q_results

def get_adjustments(jt_id):
    # Retrieve adjustments related to the given JuridicalText ID
    adjustments = Adjutstement.objects.filter(adjusted_num=jt_id).values('adjusting_num', 'adjustment_type')

    adjusting_texts = []

    for adjustment in adjustments:
        adjusting_num = adjustment['adjusting_num']
        adjustment_type = adjustment['adjustment_type']

        # Retrieve adjusting JuridicalText object from Elasticsearch
        adjusting_text = get_adjusting_text(adjusting_num)

        if adjusting_text:
            adjusting_texts.append({
                'adjusted_num': jt_id,
                'adjusting_num': adjusting_num,
                'adjustment_type': adjustment_type,
                'adjusting_text': adjusting_text,
            })

    return adjusting_texts

def get_adjusting_text(jt_id):
    # Retrieve adjusting JuridicalText object from Elasticsearch
    result = Search(index='juridical_texts').query('match', id_text=jt_id).execute()

    if result:
        return result[0].to_dict()
    else:
        return None
