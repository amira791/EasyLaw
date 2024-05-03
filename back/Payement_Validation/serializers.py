
from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer 

from .models import *

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        depth = 1


class FactureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facture
        fields = '__all__'

class AbonnementSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    facture = FactureSerializer()

    class Meta:
        model = Abonnement
        fields = '__all__'


class AbonnementFullSerializer(serializers.ModelSerializer):
    service = ServiceSerializer()
    facture = FactureSerializer()

    class Meta:
        model = Abonnement
        fields = '__all__'