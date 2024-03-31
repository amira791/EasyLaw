from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import JuridicalText, Adjutstement, OfficialJournal
@registry.register_document
class JuridicalTextDocument(Document):
    class Index:
        name = 'juridical_texts'
    
    class Django:
        model = JuridicalText
        fields = ['id_text', 'type_text', 'signature_date', 'publication_date', 'jt_number', 'source', 'official_journal_page', 'description']

