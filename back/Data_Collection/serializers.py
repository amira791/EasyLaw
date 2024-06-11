from rest_framework import serializers
from .models import Adjutstement, JuridicalText, OfficialJournal, Scrapping






class JuridicalTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuridicalText
        fields = '__all__'


class OfficialJournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficialJournal
        fields = ['number', 'year']

class JuridicalTextSerializer(serializers.ModelSerializer):
    official_journal = OfficialJournalSerializer()

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

    def update(self, instance, validated_data):
        official_journal_data = validated_data.pop('official_journal', None)
        
        # Update the JuridicalText instance fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Update or create the nested OfficialJournal instance
        if official_journal_data:
            official_journal_instance, created = OfficialJournal.objects.get_or_create(
                id=instance.official_journal.id,
                defaults=official_journal_data
            )
            if not created:
                for attr, value in official_journal_data.items():
                    setattr(official_journal_instance, attr, value)
                official_journal_instance.save()
            
            instance.official_journal = official_journal_instance

        instance.save()
        return instance
    
    

class ScrappingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Scrapping
        fields = ['id', 'user', 'state', 'date']  # Include 'state' in the fields



class AdjustmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adjutstement
        fields = ['adjusted_num', 'adjusting_num', 'adjustment_type']



class CustomJuridicalTextSerializer(serializers.ModelSerializer):
    official_journal_year = serializers.SerializerMethodField()
    official_journal_number = serializers.SerializerMethodField()

    class Meta:
        model = JuridicalText
        fields = [
            'id_text',
            'description',
            'type_text',
            'signature_date',
            'publication_date',
            'jt_number',
            'source',
            'official_journal_year',
            'official_journal_number'
        ]

    def get_official_journal_year(self, obj):
        return obj.official_journal.year

    def get_official_journal_number(self, obj):
        return obj.official_journal.number