from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model


# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'email', 'nom', 'prenom', 'role', 'num_telephone', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation', 'bio', 'location', 'profile_picture', 'password']
#         extra_kwargs = {'password': {'write_only': True}}


# class EditUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'username', 'email', 'nom', 'prenom', 'role', 'num_telephone', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation', 'bio', 'location', 'profile_picture']
#         extra_kwargs = {'password': {'write_only': True, 'required': False}}


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nom', 'prenom', 'num_telephone', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation', 'bio', 'location', 'profile_picture', 'password']
       

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id_client', 'user']

class ModerateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moderateur
        fields = ['id_moderateur', 'user']




from django.contrib.auth.hashers import make_password

class EditUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'nom', 'prenom', 'num_telephone', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation', 'bio', 'location', 'profile_picture']
        # Remove 'password' from read_only_fields to allow hashing during updates
        read_only_fields = []

