import elasticsearch
from elasticsearch_dsl import Search
from elasticsearch import Elasticsearch

ELASTIC_HOST = 'http://localhost:9200/'

# Create the client instance
client = Elasticsearch(
    [ELASTIC_HOST],
    basic_auth=('nermine', '17161670')
)



def lookup(query, index='juridical_texts', fields=['id_text','type_text',  'description']):
    if not query:
        return 
    results = Search(
        index=index).using(client).query("multi_match", fields=fields, fuzziness='AUTO', query=query)

    q_results = []

    for hit in results:
        print(hit.id_text)
        print(hit.description)
        print(hit.type_text)
        print(hit.signature_date)
        print(hit.publication_date)
    
    

   
        data = {
            "id": hit.id_text,
            "description": hit.description,
            "type_text": hit.type_text,
            "signature_date" : hit.signature_date,
            "publication_date":hit.publication_date,
            "jt_number":hit.jt_number,
            "source":hit.source,
            "official_journal_page":hit.official_journal_page,
    
        }
        q_results.append(data)
    return q_results
       
       
