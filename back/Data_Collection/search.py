import elasticsearch
from elasticsearch_dsl import Search, Q, Index
from elasticsearch import Elasticsearch
from .models import Adjutstement
from django.urls import reverse
import json
import re


ELASTIC_HOST = 'http://localhost:9200/'

# Create the client instance
client = Elasticsearch(
    [ELASTIC_HOST],
    basic_auth=('nermine', '17161670')
)

# The search function
def lookup(query, index='juridical_texts', fields=['id_text','source', 'type_text', 'description', 'extracted_text'],
            sort_by=None, source=None, year=None, signature_date=None,
             publication_date=None, type=None, ojNumber=None, 
             jtNumber=None,interest_domain=None, page=1, page_size=50):
    if not query:
         return [], 0
    # Définition du tri en fonction du paramètre sort_by pour avoir le tri pertinence ou par date de publication
    if sort_by == 'publication_date':
        sort = {'publication_date': {'order': 'desc'}}  
    else:
        sort = '_score'  # Tri par défaut (pertinence)
    #la requete de la recherche 
    s = Search(index=index).using(client).query(
        "multi_match", fields=fields, fuzziness='AUTO', query=query
    ).sort(sort)
    # Highlighting
    s = s.highlight('description', 'type_text', 'source', 'extracted_text','truncated_text_file_content', pre_tags="<mark>", post_tags="</mark>")
    
    # Pagination
    s = s[(page - 1) * page_size: page * page_size]
   # Ajout des filtres supplémentaires
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
        s = s.filter('match',jt_number=jtNumber)
    if interest_domain:
        s = s.filter('term', intrest__name=interest_domain)    
   

    # Exécution de la recherche
    s = Search(index=index).using(client).query(bool_query).sort(sort)
    
    # Pagination
    s = s[(page - 1) * page_size : page * page_size]
    
    # Exécuter la recherche Elasticsearch
    results = s.execute()
    results_length = len(results) #pour la langueur de resultat
    q_results = []
    with open(r'c:\Users\Amatek\Downloads\sheetsresult.json', 'r') as file:
         pagination_info = json.load(file)
        
    for hit in results:
        print(hit)
        # Retrieve adjustments related to the current JuridicalText
        adjustments = get_adjustments(hit.id_text)
        official_journal_id = hit.official_journal.year if hit.official_journal else None
        official_journal_id_str = str(official_journal_id) if official_journal_id is not None else None
        if 1962 <= int(official_journal_id_str) <= 1992:
           real_page=get_real_page_number(official_journal_id_str,hit.official_journal.number ,hit.official_journal_page, pagination_info)
        else:
            real_page=hit.official_journal_page
        highlighted_description = hit.meta.highlight.description[0] if hasattr(hit.meta, 'highlight') and hit.meta.highlight.to_dict().get('description') else hit.description
        highlighted_type_text = hit.meta.highlight.type_text[0] if hasattr(hit.meta, 'highlight') and hit.meta.highlight.to_dict().get('type_text') else hit.type_text
        highlighted_source = hit.meta.highlight.source[0] if hasattr(hit.meta, 'highlight') and hit.meta.highlight.to_dict().get('source') else hit.source
        # Mettre en surbrillance tous les mots après la troncature
        highlighted_full_extracted_text = ""
        if hasattr(hit.meta, 'highlight') and hit.meta.highlight.to_dict().get('extracted_text'):
           highlighted_extracted_text = " ".join(hit.meta.highlight.extracted_text)
           if highlighted_extracted_text != hit.extracted_text:
             highlighted_full_extracted_text = highlighted_extracted_text + "..."
           else:
             highlighted_full_extracted_text = highlighted_extracted_text
        data = {
            "id_text": hit.id_text,
           "description": highlighted_description,
            "type_text": highlighted_type_text,
            "signature_date" : hit.signature_date,
            "publication_date": hit.publication_date,
            "jt_number": hit.jt_number,
            "source": highlighted_source,
            "real_page": real_page,
            "official_journal_page": hit.official_journal_page,
            "official_journal_year": official_journal_id_str,
            "official_journal_number": hit.official_journal.number if hit.official_journal else None,
            "text_file_content":hit.extracted_text,
            "truncated_text_file_content":highlighted_full_extracted_text,
            "interestDomain": hit.intrest.name if hit.intrest else None,
            "adjustments": adjustments, # Include adjustments data
        }
        q_results.append(data)

    return q_results, results_length


def lookup_no_adjust(query, index='juridical_texts', fields=['id_text','source', 'type_text', 'description', 'extracted_text'],
           source=None, year=None, type = None):
    
    if not query:
        return

    sort = '_score'  # Tri par défaut (pertinence)
    
    # Création de la requête booléenne
    bool_query = Q('bool', must=[Q('match_phrase', extracted_text=query)])

    # Ajout des filtres supplémentaires à la requête booléenne
    if source:  
        bool_query = bool_query & Q('match_phrase', source=source)
    if year:  
        bool_query = bool_query & Q('range', publication_date={'gte': year + '-01-01', 'lte': year + '-12-31'})
    if type:
        bool_query = bool_query & Q('match_phrase', type_text=type)

    # Exécution de la recherche
    s = Search(index=index).using(client).query(bool_query).sort(sort)
    
    # Exécuter la recherche Elasticsearch
    results = s.execute()
    results_length = len(results)
    q_results = []
        
    for hit in results:
        official_journal_id = hit.official_journal.year if hit.official_journal else None
        official_journal_id_str = str(official_journal_id) if official_journal_id is not None else None
        
        data = {
            "id_text": hit.id_text,
            "description": hit.description,
            "type_text": hit.type_text,
            "signature_date": hit.signature_date,
            "publication_date": hit.publication_date,
            "jt_number": hit.jt_number,
            "source": hit.source,
            "official_journal_year": official_journal_id_str,
            "official_journal_number": hit.official_journal.number if hit.official_journal else None,
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
                if file_name.startswith(f'A{year}') and p_b <= page_initial  <= p_e:
                    real_page = page_initial - p_b +1
                    return int(real_page)
    
    return None  # Return None if the entry is not found
