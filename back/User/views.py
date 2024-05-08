from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from .serializers import *
from .models import *
# from . import privileges


User = get_user_model()

@api_view(['POST'])
def signup(request):
    user_type = request.data.get('user_type')
    user_data = request.data.get('user')

    # Validate user_type
    if user_type not in ['client', 'moderateur']:
        return Response({'error': 'Invalid user_type'}, status=status.HTTP_400_BAD_REQUEST)

    # Create user and related model based on user_type
    serializer = UserSerializer(data=user_data)
    if serializer.is_valid():
        user = serializer.save()

        if user_type == 'client':
            Client.objects.create(user=user)
            # user.groups.add(Group.objects.get(name='Fournisseurs'))
        elif user_type == 'moderateur':
            Moderateur.objects.create(user=user)
            # user.groups.add(Group.objects.get(name='Consommateurs'))

        return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def signup(request):
#     if request.method == 'POST':
#         data = request.data.copy()
#         data['password'] = make_password(data['password'])  # Hash the password
#         serializer = CustomUserSerializer(data=data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if username is None or password is None:
        return Response({'error': 'Please provide both username/email and password'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(username=username).first()

    if user is None:
        return Response({'error': 'User does not exist'}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(password):
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=HTTP_400_BAD_REQUEST)



# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = authenticate(username=username, password=password)

#     if user:
#         token, _ = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key}, status=HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials'}, status=HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    token = request.META.get('HTTP_AUTHORIZATION').split()[1]
    user = Token.objects.get(key=token).user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['PUT'])  # Use PUT method for updating user info
@permission_classes([IsAuthenticated])  # User must be authenticated
def edit_user_info(request):
    user = request.user  # Get the authenticated user

    if not user:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

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