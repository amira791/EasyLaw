from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import CustomUserSerializer, EditUserSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth.hashers import make_password
import requests

from .models import CustomUser
import logging

from Payement_Validation.models import Abonnement
from Payement_Validation.serializers import AbonnementUserSerializer

logger = logging.getLogger(__name__) 


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['password'] = make_password(data['password'])  # Hash the password
        data['role'] = 'client'  # Set role to 'user' during signup
        data['stripeCustomerId'] = stripeCustomerId(data['username'], data['email'], request)
        serializer = CustomUserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        role = user.role  # Include role information in the response
        if(user.etat != "Active"):
            return Response({'error': 'this user is blocked'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'token': token.key, 'role': role}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    token = request.META.get('HTTP_AUTHORIZATION').split()[1]
    user = Token.objects.get(key=token).user
    serializer = CustomUserSerializer(user)
    return Response(serializer.data)


@api_view(['PUT'])  # Use PUT method for updating user info
@permission_classes([IsAuthenticated])  # User must be authenticated
def edit_user_info(request):
    user = request.user  # Get the authenticated user

    # Check if the request data is valid based on the serializer
    serializer = EditUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()  # Save the updated user data
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not user.check_password(old_password):
        return Response({'error': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()
    return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])  # Use POST method for logout
@permission_classes([IsAuthenticated])  # User must be authenticated to logout
def logout(request):
    user = request.user
    Token.objects.filter(user=user).delete()  # Delete the user's authentication token
    return Response({'message': 'Logged out successfully.'})


@api_view(['GET']) 
def allUsers(request):
    if request.method == 'GET':
        users = CustomUser.objects.all()


        serialized_users = CustomUserSerializer(users, many=True) 
        logger.info(f'Get All users ') 
        sub = Abonnement.objects.filter(statut = "active")

        for user in serialized_users.data:
            subbed = sub.filter(user= user["id"])
            if(len(subbed)):
                user["sub"] = subbed[0].service.nom
            else:
                user["sub"] = "غير مشترك"


        print(serialized_users.data[0]["sub"])

        
        

        return Response({'users': serialized_users.data})

         


@api_view(['POST'])
def createMod(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['password'] = make_password(data['password'])  # Hash the password
        data['role'] = 'moderateur'  
        data['etat'] = 'Active'
        data['stripeCustomerId'] = stripeCustomerId(data['username'], data['email'], request)
        serializer = CustomUserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            logger.info(f'User {user.username} {user.role} make payment ')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def activateUser(request):
    if request.method == 'POST':
        username = request.data.get('username')
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user.etat = CustomUser.ACTIVE  # Set user's state to Active
        user.save()
        logger.info(f'User {user.username}  activated successfully')
        
        return Response({'message': 'User activated successfully'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def blockUser(request):
    if request.method == 'POST':
        username = request.data.get('username')
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user.etat = CustomUser.NOT_ACTIVE  # Set user's state to Not Active
        user.save()
        logger.info(f'User {user.username}  User blocked successfully')
        
        return Response({'message': 'User blocked successfully'}, status=status.HTTP_200_OK)



@api_view(['POST'])
def warnUser(request):
    if request.method == 'POST':
        username = request.data.get('username')
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        user.warned = True  # Set user's state to Not Active
        user.save()
        logger.info(f'User {user.username}  User warned')
        
        return Response({'message': 'User warned'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def isWarned(request):
    if request.method == 'POST':
        username = request.user.username
        try:
            user = CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        warned = user.warned
        user.warned = False  # Set user's state to Not Active
        user.save()
        logger.info(f'User {user.username}  User receved warning')
        
        return Response({'warned': warned}, status=status.HTTP_200_OK)