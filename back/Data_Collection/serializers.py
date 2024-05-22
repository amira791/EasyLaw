from rest_framework import serializers
from .models import Adjutstement, JuridicalText, Scrapping

class JuridicalTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuridicalText
        fields = '__all__'


class JuridicalTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuridicalText
        fields = [
            'id_text',
            'type_text',
            'signature_date', 
            'publication_date', 
            'jt_number', 
            'source', 
            'official_journal', 
            'official_journal_page', 
            'description', 
            'text_file', 
            'extracted_text', 
            'intrest',
            'scrapping'
        ]


class ScrappingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scrapping
        fields = ['id', 'user', 'date']


class AdjustmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adjutstement
        fields = ['adjusted_num', 'adjusting_num', 'adjustment_type']