from rest_framework import serializers
from .models import JuridicalText

class JuridicalTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuridicalText
        fields = '__all__'