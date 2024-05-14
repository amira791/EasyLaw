# serializers.py

from rest_framework import serializers
from .models import OfficialJournal

class OfficialJournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficialJournal
        fields = '__all__'
