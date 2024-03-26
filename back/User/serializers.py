from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'nom', 'prenom', 'role', 'num_telephone', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation', 'bio', 'location', 'profile_picture', 'password']
        extra_kwargs = {'password': {'write_only': True}}