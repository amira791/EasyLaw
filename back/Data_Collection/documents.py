from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import JuridicalText, Adjutstement

@registry.register_document
class JuridicalTextDocument(Document):
    # Define fields for Elasticsearch indexing
    adjusted_texts = fields.NestedField(properties={
        'adjusted_num': fields.KeywordField(),
        'adjusting_num': fields.KeywordField(),
        'adjustment_type': fields.KeywordField(),
    })

    # Define the field for official_journal
    official_journal = fields.ObjectField(properties={
        'number': fields.IntegerField(),
        'year': fields.IntegerField(),
    })

    class Index:
        name = 'juridical_texts'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0,
            'analysis': {
                'analyzer': {
                    'custom_arabic_analyzer': {
                     'type': 'custom', 
                    'tokenizer': 'arabic', 
                    'filter': ['lowercase', 'arabic_normalization']  
                    }
                }
            }
        }

    class Django:
        model = JuridicalText
        fields = ['id_text', 'type_text', 'signature_date', 'publication_date', 'jt_number',
                  'source', 'official_journal_page', 'description', 'extracted_text']

    def get_adjustments(self, obj):
        adjustments = Adjutstement.objects.filter(adjusted_num=obj.id_text).values('adjusting_num', 'adjustment_type')
        adjusting_texts = []
        
        for adjustment in adjustments:
            adjusting_num = adjustment['adjusting_num']
            adjustment_type = adjustment['adjustment_type']
            adjusting_text = JuridicalText.objects.filter(id_text=adjusting_num).first()
            
            if adjusting_text:
                adjusting_texts.append({
                    'adjusted_num': obj.id_text,
                    'adjusting_num': adjusting_num,
                    'adjustment_type': adjustment_type,
                })
        
        return adjusting_texts

    def prepare_adjusted_texts(self, instance):
        adjusted_texts = self.get_adjustments(instance)
        return adjusted_texts

    def prepare(self, obj):
        data = super().prepare(obj)
        data['adjusted_texts'] = self.prepare_adjusted_texts(obj)
        
        # Include the official_journal information
        if obj.official_journal:
            data['official_journal'] = {
                'number': obj.official_journal.number,
                'year': obj.official_journal.year,
                
            }
        
        return data
