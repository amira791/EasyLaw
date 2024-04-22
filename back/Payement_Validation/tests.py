from django.test import TestCase
from django.http import HttpRequest
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from unittest.mock import MagicMock, patch
from .views import getServices, addUser, getsubscription
from .models import Service, Abonnement
from User.models import CustomUser

import stripe

from collections import namedtuple
from datetime import datetime, timedelta


class GetServicesTestCase(TestCase):
    def setUp(self):
        self.service1 = Service.objects.create(id= 0,nom="Service 1", tarif = 2000, priceId = "price")
        self.service2 = Service.objects.create(id= 1,nom="Service 2", tarif = 2000, priceId = "price")


    def test_get_services(self):

        # Creating a mock request object with an authenticated user
        request = HttpRequest()
        request.method = 'GET'

        user = {"id":123, "is_authenticated":True}
        request.user = user  

        # Call the view function
        response = getServices(request)

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["all"][0]["nom"], "Service 1")
        self.assertEqual(response.data["all"][1]["nom"], "Service 2")
        self.assertEqual(response.data["all"][0]["tarif"], 2000)
        self.assertEqual(response.data["current"], None)





class AddUserTestCase(TestCase):

    @patch('stripe.Customer.create')
    @patch('stripe.Customer.list')
    def test_add_user_existing_customer(self, mock_customer_list, mock_customer_create):
        # Mock request object with POST data
        request = HttpRequest()
        request.method = 'POST'
        request.data = {'name': 'John Doe', 'email': 'john@example.com'}

        # Mock existing customer response from Stripe
        Customer = namedtuple("User", ["id", "stripeCustomerId"])
        mock_customer_list.return_value.data = [Customer(id= 1, stripeCustomerId = 'existing_customer_id')]


        # Call the view function
        response = addUser(request)

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['stripe_customer_id'], 'existing_customer_id')




    @patch('stripe.Customer.create')
    @patch('stripe.Customer.list')
    def test_add_user_new_customer(self, mock_customer_list, mock_customer_create):
        # Mock request object with POST data
        request = HttpRequest()
        request.method = 'POST'
        request.data = {'name': 'John Doe', 'email': 'john@example.com'}

        # Mock empty existing customer response from Stripe
        mock_customer_list.return_value.data = []

        # Mock new customer creation response from Stripe
        mock_customer_create.return_value.id = 'new_customer_id'

        # Call the view function
        response = addUser(request)

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['stripe_customer_id'], 'new_customer_id')


    @patch('stripe.Customer.create', side_effect=stripe.error.StripeError)
    @patch('stripe.Customer.list')
    def test_add_user_stripe_error(self, mock_customer_list, mock_customer_create):
        # Mock request object with POST data
        request = HttpRequest()
        request.method = 'POST'
        request.data = {'name': 'John Doe', 'email': 'john@example.com'}

        # Mock empty existing customer response from Stripe
        mock_customer_list.return_value.data = []

        # Call the view function
        response = addUser(request)

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)





class getsubscriptionTestCase(TestCase):

    def setUp(self):
        self.service1 = Service.objects.create(id= 0,nom="Service 1", tarif = 2000, priceId = "price")
        self.user = CustomUser.objects.create(id= 2)
        self.abonement = Abonnement.objects.create(id= 0,user= self.user,service=self.service1, dateDebut = datetime.now().strftime('%Y-%m-%d'), 
                                                    dateFin= (datetime.now()+timedelta(days=30)).strftime('%Y-%m-%d'), statut = "active")
        self.token = Token.objects.create(user=self.user)

    def test_get_subscription_active(self):

        # Creating a mock request object with an authenticated user
        request = HttpRequest()
        request.method = 'GET'

        request.META['HTTP_AUTHORIZATION'] = f'Token {self.token.key}'

        user = {"id":123, "is_authenticated":True}
        request.user = user  

        # Call the view function
        response = getsubscription(request)

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["service"]["nom"], "Service 1")
    
    
    def test_get_subscription_inactive(self):

        abonement = Abonnement.objects.get(id=0)
        abonement.statut = "inactive"
        abonement.save()

        # Creating a mock request object with an authenticated user
        request = HttpRequest()
        request.method = 'GET'

        request.META['HTTP_AUTHORIZATION'] = f'Token {self.token.key}'

        user = {"id":123, "is_authenticated":True}
        request.user = user  

        # Call the view function
        response = getsubscription(request)

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
    


