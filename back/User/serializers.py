from rest_framework import serializers
from .models import Client  # Adjust the import according to your project structure

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        # Include all the fields from your Client model or just the ones you need to expose
        fields = ['id', 'username', 'password', 'email', 'numTelephone', 'role', 'nom', 'prenom', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Assuming you have a method to handle user creation that hashes the password
        user = Client.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            numTelephone=validated_data.get('numTelephone'),
            role=validated_data.get('role'),
            nom=validated_data.get('nom'),
            prenom=validated_data.get('prenom'),
            dateNaiss=validated_data.get('dateNaiss'),
            lieuNaiss=validated_data.get('lieuNaiss'),
            univer_Entrep=validated_data.get('univer_Entrep'),
            occupation=validated_data.get('occupation')
        )
        return user

    def update(self, instance, validated_data):
    
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        # Password should be  (hashed)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        # Update other fields similarly
        instance.numTelephone = validated_data.get('numTelephone', instance.numTelephone)
        instance.role = validated_data.get('role', instance.role)
        # Update the rest of the fields similarly...
        
        instance.save()
        return instance
