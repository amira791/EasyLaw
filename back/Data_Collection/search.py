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
    basic_auth=('nermine', '17161670'))
# the search function
def lookup(query, index='juridical_texts', fields=['id_text','source', 'type_text', 'description', 'extracted_text'],
            sort_by=None, source=None, year=None, signature_date=None,
             publication_date=None, type=None, ojNumber=None, 
             jtNumber=None, domain=None, page=None, page_size=None):
    if not query:
        return
    # Définition du tri en fonction du paramètre sort_by pour avoir le tri pertinence ou par date
    if sort_by == 'publication_date':
        sort = {'publication_date': {'order': 'desc'}}  # Tri par date de publication
    else:
        sort = '_score'  # Tri par défaut (pertinence)
    #la requete de la recherche 
    s = Search(index=index).using(client).query(
        "multi_match", fields=fields, fuzziness='AUTO', query=query
    ).sort(sort)
    
    # Pagination
    s = s[(page - 1) * page_size: page * page_size]
   # Ajout des filtres supplémentaires
    if source:  
        s = s.filter('match_phrase', source=source)
    if year:  
        s = s.filter('range', publication_date={'gte': year + '-01-01', 'lte': year + '-12-31'})
    if signature_date:
        s = s.filter('term', signature_date=signature_date)
    if publication_date:#remarque=dans le front on exige le format de publication date et signature date 
        s = s.filter('term', publication_date=publication_date)
    if type:
        s = s.filter('match_phrase', type_text=type)
    if ojNumber:
        s = s.filter('term',official_journal_page=ojNumber)
    if jtNumber:
        s = s.filter('match',  jt_number= jtNumber)
    if domain:
        s = s.filter('term', description=domain)

    # Exécuter la recherche Elasticsearch
    results = s.execute()
    results_length = len(results)
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
        data = {
            "id_text": hit.id_text,
            "description": hit.description,
            "type_text": hit.type_text,
            "signature_date" : hit.signature_date,
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
    # Get the length of results

    return q_results,results_length

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