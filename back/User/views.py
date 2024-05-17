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

import logging

from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.urls import reverse

from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str

from django.utils.http import urlsafe_base64_decode
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model()

logger = logging.getLogger(__name__)

# from . import privileges

@api_view(['POST'])
def signup(request):
    user_type = request.data.get('user_type')
    user_data = request.data.get('user')

    # Validate user_type
    if user_type not in ['client', 'moderateur']:
        logger.error('Signup failed: Invalid user_type')
        return Response({'error': 'Invalid user_type'}, status=status.HTTP_400_BAD_REQUEST)

    # Create user and related model based on user_type
    serializer = UserSerializer(data=user_data)
    if serializer.is_valid():
        user = serializer.save()

        if user_type == 'client':
            Client.objects.create(user=user)
            logger.info(f'User {user.username} signed up as a client')
        elif user_type == 'moderateur':
            Moderateur.objects.create(user=user)
            logger.info(f'User {user.username} signed up as a moderator')

        # Generate email confirmation token
        token_generator = default_token_generator
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        confirmation_url = reverse('confirm-email', kwargs={'uidb64': uid, 'token': token})

        # Send confirmation email
        send_mail(
            'Confirm your email',
            f'Click this link to confirm your email: {request.build_absolute_uri(confirmation_url)}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return Response({'success': 'User created successfully. Check your email for confirmation link.'}, status=status.HTTP_201_CREATED)

    logger.error('Signup failed: Invalid user data')
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def confirm_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return Response({'success': 'Email confirmed successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid confirmation link'}, status=status.HTTP_400_BAD_REQUEST)
    

# this don't have the email confirmation
@api_view(['POST'])
def signup_old(request):
    user_type = request.data.get('user_type')
    user_data = request.data.get('user')

    # Validate user_type
    if user_type not in ['client', 'moderateur']:
        logger.error('Signup failed: Invalid user_type')
        return Response({'error': 'Invalid user_type'}, status=status.HTTP_400_BAD_REQUEST)

    # Create user and related model based on user_type
    serializer = UserSerializer(data=user_data)
    if serializer.is_valid():
        user = serializer.save()

        if user_type == 'client':
            Client.objects.create(user=user)
            logger.info(f'User {user.username} signed up as a client')
        elif user_type == 'moderateur':
            Moderateur.objects.create(user=user)
            logger.info(f'User {user.username} signed up as a moderator')

        return Response({'success': 'User created successfully'}, status=status.HTTP_201_CREATED)
    
    logger.error('Signup failed: Invalid user data')
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
        logger.error('Login failed: Please provide both username/email and password')
        return Response({'error': 'Please provide both username/email and password'}, status=status.HTTP_400_BAD_REQUEST)

    # Custom authentication logic
    user = custom_authenticate(username, password)
    if user is None:
        logger.error('Login failed: Invalid credentials')
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.is_active:
        logger.info(f'User {username} tried to log in but the account is inactive')
        return Response({'error': 'Account is inactive'}, status=status.HTTP_403_FORBIDDEN)

    # Authentication successful
    token, _ = Token.objects.get_or_create(user=user)
    logger.info(f'User {username} successfully logged in')
    return Response({'token': token.key}, status=status.HTTP_200_OK)


#le but de cree cette function et pour distangue entre le cas ou les cordonees sont fausses ou bien correct mais le compte est inactif
def custom_authenticate(username, password):
    try:
        user = User.objects.get(username=username)
        if user.check_password(password):
            return user
    except User.DoesNotExist:
        pass
    return None


@api_view(['POST'])
@permission_classes([AllowAny])
def login_old(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if username is None or password is None:
        logger.error('Login failed: Please provide both username/email and password')
        return Response({'error': 'Please provide both username/email and password'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.filter(username=username).first()

    if user is None:
        logger.error('Login failed: User does not exist')
        return Response({'error': 'User does not exist'}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(password):
        logger.error('Login failed: Invalid credentials')
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        logger.info(f'User {username} successfully logged in')
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        logger.error('Login failed: Invalid credentials')
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)



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


#######################################################################################################
############################### Before Loggin #########################################################
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user_info(request):
#     token = request.META.get('HTTP_AUTHORIZATION').split()[1]
#     user = Token.objects.get(key=token).user
#     serializer = UserSerializer(user)
#     return Response(serializer.data)


# @api_view(['PUT'])  # Use PUT method for updating user info
# @permission_classes([IsAuthenticated])  # User must be authenticated
# def edit_user_info(request):
#     user = request.user  # Get the authenticated user

#     if not user:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

#     # Check if the request data is valid based on the serializer
#     serializer = EditUserSerializer(user, data=request.data)

#     if serializer.is_valid():
#         serializer.save()  # Save the updated user data
#         return Response(serializer.data)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def change_password(request):
#     user = request.user
#     old_password = request.data.get('old_password')
#     new_password = request.data.get('new_password')

#     if not user.check_password(old_password):
#         return Response({'error': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)

#     user.set_password(new_password)
#     user.save()
#     return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)


# @api_view(['POST'])  # Use POST method for logout
# @permission_classes([IsAuthenticated])  # User must be authenticated to logout
# def logout(request):
#     user = request.user
#     Token.objects.filter(user=user).delete()  # Delete the user's authentication token
#     return Response({'message': 'Logged out successfully.'})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    token = request.META.get('HTTP_AUTHORIZATION').split()[1]
    user = Token.objects.get(key=token).user
    logger.info(f'User {user.username} accessed user info')
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_user_info(request):
    user = request.user

    if not user:
        logger.error('Edit user info failed: Invalid credentials')
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    serializer = EditUserSerializer(user, data=request.data)

    if serializer.is_valid():
        serializer.save()
        logger.info(f'User {user.username} updated their info')
        return Response(serializer.data)
    else:
        logger.error('Edit user info failed: Invalid request data')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not user.check_password(old_password):
        logger.error('Change password failed: Invalid old password')
        return Response({'error': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()
    logger.info(f'User {user.username} changed their password')
    return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    user = request.user
    Token.objects.filter(user=user).delete()
    logger.info(f'User {user.username} logged out')
    return Response({'message': 'Logged out successfully.'})