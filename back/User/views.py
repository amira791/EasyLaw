from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .serializers import ClientSerializer

User = get_user_model()

@api_view(['POST'])
def signup(request):
    """
    Create a new user.
    """
    serializer = ClientSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Assuming the user model has a method to set password, which should be handled in the serializer or model
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    """
    Authenticate a user and return a token.
    """
    user = authenticate(username=request.data.get('email'), password=request.data.get('password'))
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': ClientSerializer(user).data})
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    """
    Test endpoint for validating token authentication.
    """
    return Response({"message": f"Passed for {request.user.email}"})
