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


from Data_Collection.models import IntrestDomain


User = get_user_model()

logger = logging.getLogger(__name__) 


@api_view(['POST'])
def signup(request):
    user_data = request.data  # Access user data directly from the request body

    # Hash the password before saving
    user_data['password'] = make_password(user_data['password'])
    serializer = CustomUserSerializer(data=user_data)

    if serializer.is_valid():
        user = serializer.save()


        token_generator = default_token_generator
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        confirmation_url = reverse('confirm-email', kwargs={'uidb64': uid, 'token': token})


        send_mail(
            'Confirm your email',
            f'Click this link to confirm your email: {request.build_absolute_uri(confirmation_url)}',
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return Response({'success': 'User created successfully. Check your email for confirmation link.'}, status=status.HTTP_201_CREATED)
    else:
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
    

@api_view(['POST'])
def signup2(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['password'] = make_password(data['password'])  # Hash the password
        data['role'] = 'client'  
        data['etat'] = 'Active'
        data['stripeCustomerId'] = stripeCustomerId(data['username'], data['email'], request)
        serializer = CustomUserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login2(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        role = user.role  # Include role information in the response
        etat = user.etat
        if etat == "Active":
            
          return Response({'token': token.key, 'role': role}, status=status.HTTP_200_OK)
          
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        role = user.role  # Include role information in the response
        etat = user.etat
        if etat == "Active":
            return Response({'token': token.key, 'role': role}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User is not active'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    token = request.META.get('HTTP_AUTHORIZATION').split()[1]
    user = Token.objects.get(key=token).user
    serializer = CustomUserSerializer(user)
    logger.info(f'get All users Info ')
    logger.info(f'User {user.username} {user.role} login')
    return Response(serializer.data)


@api_view(['PUT'])  # Use PUT method for updating user info
@permission_classes([IsAuthenticated])  # User must be authenticated
def edit_user_info(request):
    user = request.user  # Get the authenticated user

    # Check if the request data is valid based on the serializer
    serializer = EditUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()  # Save the updated user data
        logger.info(f'User {user.username} {user.role} edit profile info')

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
    logger.info(f'User {user.username} {user.role} change his password ')
    return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])  # Use POST method for logout
@permission_classes([IsAuthenticated])  # User must be authenticated to logout
def logout(request):
    user = request.user
    Token.objects.filter(user=user).delete()  # Delete the user's authentication token
    logger.info(f'User {user.username} {user.role} logout  ')
    return Response({'message': 'Logged out successfully.'})





@api_view(['GET']) 
def allUsers(request):
    if request.method == 'GET':
        users = CustomUser.objects.all()  
        serialized_users = CustomUserSerializer(users, many=True) 
        logger.info(f'Get All users ') 
        return Response({'users': serialized_users.data})

         

def stripeCustomerId(name, email,request):
    url = root_url = request.build_absolute_uri('/')[:-1] +'/payment/customer'
    data = {
    "name":name,
    "email":email
    }  
    print(data)

    # Send POST request
    response = requests.post(url, json=data)

    return response.json()["stripe_customer_id"]

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
    




##################################################################################################
################################Domaine Interet###################################################


@api_view(['POST'])
def create_domaine_interet(request):
    if request.method == 'POST':
        try:
            nom_domaine = request.data.get('nom_domaine')

            if not nom_domaine:
                return Response({'error': 'nom_domaine is required'}, status=400)

            # Check if the IntrestDomain already exists
            existing_domaine = IntrestDomain.objects.filter(name=nom_domaine).first()
            if existing_domaine:
                return Response({'error': 'Domaine already exists'}, status=400)

            # Create the IntrestDomain
            domaine = IntrestDomain.objects.create(name=nom_domaine)
            logger.info(f'Domaine "{nom_domaine}" created successfully by user {request.user.username}')
            return Response({'message': f'Domaine "{nom_domaine}" created successfully'}, status=201)
        except Exception as e:
            logger.error(f'Error creating IntrestDomain: {str(e)}')
            return Response({'error': str(e)}, status=500)
    else:
        return Response({'error': 'Only POST requests are allowed'}, status=405)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_domaine_interet(request):
    user = request.user
    domaine_id = request.data.get('domaine_id')

    if domaine_id is None:
        return Response({'error': 'Domaine ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    domaine = get_object_or_404(IntrestDomain, id=domaine_id)

    if user.domaines_interet.count() >= 5:
        return Response({'error': 'User can only have up to 5 domaines d\'intérêt'}, status=status.HTTP_400_BAD_REQUEST)

    user.domaines_interet.add(domaine)
    logger.info(f'Domaine "{domaine.name}" added to user {user.username}')
    return Response({'message': f'Domaine "{domaine.name}" added to user {user.username}'}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_domaine_interet(request):
    user = request.user
    domaine_id = request.data.get('domaine_id')

    if domaine_id is None:
        return Response({'error': 'Domaine ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    domaine = get_object_or_404(IntrestDomain, id=domaine_id)

    if domaine not in user.domaines_interet.all():
        return Response({'error': 'DomaineInteret not associated with user'}, status=status.HTTP_400_BAD_REQUEST)

    user.domaines_interet.remove(domaine)
    return Response({'message': f'Domaine "{domaine.name}" removed from user {user.username}'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_domaines_interet(request):
    domaines = IntrestDomain.objects.all()
    data = [{'id': domaine.id, 'nom_domaine': domaine.name} for domaine in domaines]
    return Response(data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_domaines_interet_for_user(request):
    user = request.user
    domaines = user.domaines_interet.all()
    domaines_data = [{'id': domaine.id, 'nom_domaine': domaine.name} for domaine in domaines]
    return Response({'domaines_interet': domaines_data}, status=status.HTTP_200_OK)