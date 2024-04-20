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

    class Index:
        name = 'juridical_texts'

    class Django:
        model = JuridicalText
        # Champs du modèle à indexer dans Elasticsearch
        fields = ['id_text', 'type_text', 'signature_date', 'publication_date', 'jt_number', 'source', 'official_journal_page', 'description', 'extracted_text']
    # Méthode pour récupérer les ajustements associés à un texte juridique
    def get_adjustments(self, obj):
        # Retrieve related adjustments for the JuridicalText object
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
        # Include adjustments in the indexed document
        adjusted_texts = self.get_adjustments(instance)
        return adjusted_texts
    # Méthode pour préparer les données à indexer dans Elasticsearch
    def prepare(self, obj):
        data = super().prepare(obj)
        data['adjusted_texts'] = self.prepare_adjusted_texts(obj)
        return data
