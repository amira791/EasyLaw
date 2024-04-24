from django.test import TestCase, Client
from django.http import HttpRequest
from django.urls import reverse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from unittest.mock import MagicMock, patch
from .views import getServices, addUser, getsubscription, getinvoices, subscribe
from .models import Service, Abonnement, Facture
from User.models import CustomUser

import json

import stripe

from collections import namedtuple
from datetime import datetime, timedelta






class GetServicesTestCase(TestCase):
    def setUp(self):
        self.service1 = Service.objects.create(id= 0,nom="Service 1", tarif = 2000, priceId = "price")
        self.service2 = Service.objects.create(id= 1,nom="Service 2", tarif = 2000, priceId = "price")


    def test_get_services(self):


        # Call the view function
        response = self.client.get(reverse('service'))

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
        
        data = {'name': 'John Doe', 'email': 'john@example.com'}

        # Mock existing customer response from Stripe
        Customer = namedtuple("User", ["id", "stripeCustomerId"])
        mock_customer_list.return_value.data = [Customer(id= 1, stripeCustomerId = 'existing_customer_id')]


        # Call the view function
        response = self.client.post(reverse('customer'), data=json.dumps(data), 
                content_type='application/json')

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['stripe_customer_id'], 'existing_customer_id')




    @patch('stripe.Customer.create')
    @patch('stripe.Customer.list')
    def test_add_user_new_customer(self, mock_customer_list, mock_customer_create):
        
        data = {'name': 'John Doe', 'email': 'john@example.com'}

        # Mock empty existing customer response from Stripe
        mock_customer_list.return_value.data = []

        # Mock new customer creation response from Stripe
        mock_customer_create.return_value.id = 'new_customer_id'

        # Call the view function
        response = self.client.post(reverse('customer'), data=json.dumps(data), 
                content_type='application/json')

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['stripe_customer_id'], 'new_customer_id')


    @patch('stripe.Customer.create', side_effect=stripe.error.StripeError)
    @patch('stripe.Customer.list')
    def test_add_user_stripe_error(self, mock_customer_list, mock_customer_create):
        
        data = {'name': 'John Doe', 'email': 'john@example.com'}

        # Mock empty existing customer response from Stripe
        mock_customer_list.return_value.data = []

        # Call the view function
        response = self.client.post(reverse('customer'), data=json.dumps(data), 
                content_type='application/json')

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

        response = self.client.get(reverse('subsciption'), HTTP_AUTHORIZATION=f'Token {self.token.key}')

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["service"]["nom"], "Service 1")
    
    
    def test_get_subscription_inactive(self):

        self.abonement.statut = "inactive"
        self.abonement.save()

        response = self.client.get(reverse('subsciption'), HTTP_AUTHORIZATION=f'Token {self.token.key}')

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
    
    
    def test_get_subscription_ended(self):

        self.abonement.dateFin = (datetime.now()-timedelta(days=30)).strftime('%Y-%m-%d')
        self.abonement.save()

        response = self.client.get(reverse('subsciption'), HTTP_AUTHORIZATION=f'Token {self.token.key}')

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
    





class getinvoicesTestCase(TestCase):
    def setUp(self):
        self.service1 = Service.objects.create(id= 0,nom="Service 1", tarif = 2000, priceId = "price")
        self.user = CustomUser.objects.create(id= 2)
        self.facture = Facture.objects.create(id=1, date= datetime.now(), montant = 222, montant_payé= 222, payé= True, methode_de_payment = "Dhahabia")
        self.abonement = Abonnement.objects.create(id= 0,user= self.user,service=self.service1, dateDebut = datetime.now().strftime('%Y-%m-%d'), 
                                                    dateFin= (datetime.now()+timedelta(days=30)).strftime('%Y-%m-%d'), statut = "active", facture = self.facture)
        self.token = Token.objects.create(user=self.user)


    def test_getinvoices(self):

        response = self.client.get(reverse('invoice'), HTTP_AUTHORIZATION=f'Token {self.token.key}')

        # Assert that the response is as expected
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(int(response.data[0]["facture"]["id"]), self.facture.id)
        self.assertEqual(response.data[0]["facture"]["montant"], self.facture.montant)





class subscribeTestCase(TestCase):
        subscription = None

        def setUp(self):
            prices = stripe.Price.list(active=True)

            self.client = Client()
            self.service1 = Service.objects.create(id= prices.data[0].product, nom="Service 1", tarif = prices.data[0].unit_amount, priceId = prices.data[0].id)
            self.user = CustomUser.objects.create(id= 2, stripeCustomerId="cus_Pyrerehpdho8dz")
            self.token = Token.objects.create(user=self.user)
        
        def test_subscribe(self):

            data = {
                'priceId': self.service1.priceId,
                'paymentMethod': "CIB",
                'token': {"id":"tok_unionpay"},
            }


            response = self.client.post(reverse('subscribe'), data=json.dumps(data), 
                content_type='application/json', HTTP_AUTHORIZATION=f'Token {self.token.key}')

            self.subscription = response.data

            # Assert that the response is as expected
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
            self.assertEqual(self.subscription["service"], self.service1.id)
            self.assertEqual(self.subscription["dateFin"], (datetime.now()+timedelta(days=30)).strftime('%Y-%m-%d'))

        def tearDown(self):
            stripe.Subscription.cancel(self.subscription["id"].split("-")[0])
