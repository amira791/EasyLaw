from rest_framework import serializers
from .models import JuridicalText, Scrapping

class JuridicalTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuridicalText
        fields = '__all__'


class JuridicalTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuridicalText
        fields = [
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