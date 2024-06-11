import elasticsearch
from elasticsearch_dsl import Search, Q, Index
from elasticsearch import Elasticsearch
from .models import Adjutstement
from django.urls import reverse
import json

ELASTIC_HOST = 'http://localhost:9200/'

# Create the client instance
client = Elasticsearch(
    [ELASTIC_HOST],
    basic_auth=('nermine', '17161670')
)

# The search function
def lookuplaw(query, index='juridical_texts', fields=['id_text','source', 'type_text', 'description', 'extracted_text'],
           sort_by=None, source=None, year=None, searching_way="multi_match", signature_date=None,
           publication_date=None, type=None, ojNumber=None, 
           jtNumber=None, domain=None, page=None, page_size=None):
    
    if not query:
        return

    # Définition du tri en fonction du paramètre sort_by pour avoir le tri pertinence ou par date
    if sort_by == 'publication_date':
        sort = {'publication_date': {'order': 'desc'}}  # Tri par date de publication
    else:
        sort = '_score'  # Tri par défaut (pertinence)
    
    # Création de la requête booléenne
    bool_query = Q('bool', must=[Q('match_phrase', description=query)])

    # Ajout des filtres supplémentaires à la requête booléenne
    if source:  
        bool_query = bool_query & Q('match_phrase', source=source)
    if year:  
        bool_query = bool_query & Q('range', publication_date={'gte': year + '-01-01', 'lte': year + '-12-31'})
    if signature_date:
        bool_query = bool_query & Q('term', signature_date=signature_date)
    if publication_date:
        bool_query = bool_query & Q('term', publication_date=publication_date)
    if type:
        bool_query = bool_query & Q('match_phrase', type_text=type)
    if ojNumber:
        bool_query = bool_query & Q('term', official_journal_page=ojNumber)
    if jtNumber:
        bool_query = bool_query & Q('match', jt_number=jtNumber)
    if domain:
        bool_query = bool_query & Q('term', description=domain)

    # Exécution de la recherche
    s = Search(index=index).using(client).query(bool_query).sort(sort)
    
    # Pagination
    s = s[(page - 1) * page_size : page * page_size]
    
    # Exécuter la recherche Elasticsearch
    results = s.execute()
    results_length = len(results)
    q_results = []
    
    with open(r'C:\Users\Manel\Desktop\2CS\S2\PROJET\TP\sheetsresult.json', 'r') as file:
         pagination_info = json.load(file)
        
    for hit in results:
        # Retrieve adjustments related to the current JuridicalText
        adjustments = get_adjustments(hit.id_text)
        official_journal_id = hit.official_journal.year if hit.official_journal else None
        official_journal_id_str = str(official_journal_id) if official_journal_id is not None else None
        if 1962 <= int(official_journal_id_str) <= 1992:
           real_page = get_real_page_number(official_journal_id_str, hit.official_journal.number, hit.official_journal_page, pagination_info)
        else:
            real_page = hit.official_journal_page
        
        data = {
            "id_text": hit.id_text,
            "description": hit.description,
            "type_text": hit.type_text,
            "signature_date": hit.signature_date,
            "publication_date": hit.publication_date,
            "jt_number": hit.jt_number,
            "source": hit.source,
            "real_page": real_page,
            "official_journal_page": hit.official_journal_page,
            "official_journal_year": official_journal_id_str,
            "official_journal_number": hit.official_journal.number if hit.official_journal else None,
            "text_file_content": hit.extracted_text,
            "adjustments": adjustments,  # Include adjustments data
        }
        q_results.append(data)

    return q_results, results_length

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

def get_real_page_number(year, journal_number, page_initial, data):
    year_key = str(year)  # Convert year to string for dictionary lookup
    if year_key in data:
        for sublist in data[year_key]:  # Iterate over each sublist within the year
            for entry in sublist:  # Iterate over each entry within the sublist
                # Convert float values to integers for comparison
                file_name = str(entry['file_name'])
                p_b = int(entry['p_b'])
                p_e = int(entry['p_e'])
                if file_name.startswith(f'A{year}') and p_b <= page_initial <= p_e:
                    real_page = page_initial - p_b + 1
                    return int(real_page)
    
    return None  # Return None if the entry is not found
