from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from elasticsearch import Elasticsearch
from .views import lookup
from .models import JuridicalText, OfficialJournal, IntrestDomain 
from User.models import CustomUser
from django.test import TestCase, Client 
from django.urls import reverse
from rest_framework import status
from unittest.mock import patch

class TestLookupFunction(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.elastic_client = Elasticsearch(hosts=['http://localhost:9200/'])
         # Create user and token
        self.user = CustomUser.objects.create_user(username='testuser', password='testpass')
        self.token = Token.objects.create(user=self.user)
        self.client = Client()
    def test_lookup_with_arabic_query(self):
        """
        Tests lookup with an Arabic query ("إقتصاد المعرفة") and ensures results
        are returned with a count greater than 0.
        """
        query = "إقتصاد المعرفة"  # Arabic for "Knowledge Economy"
        results, results_length = lookup(query)
        self.assertGreater(results_length, 0)  # Ensure at least one result
    def test_lookup_without_query(self):
        query = ""
        results, results_length = lookup(query)
        self.assertEqual(results, [])
        self.assertEqual(results_length, 0)
    def test_search_functionality_authorized(self):
        search_params = {
            'q': 'قانون',  
        }
        # Send GET request with token authentication and search parameters
        response = self.client.get(reverse('index_page'), data=search_params,
                                HTTP_AUTHORIZATION=f'Token {self.token.key}')

        # Assert the response status and content
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_search_pagination(self):
        search_params = {'q': 'قانون', 'page': 2, 'page_size': 10}
        response = self.client.get(reverse('index_page'), data=search_params,
                                   HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    def test_search_with_source_filter(self):
        search_params = {'q': 'قانون', 'source': 'وزارة المالية'}
        response = self.client.get(reverse('index_page'), data=search_params,
                                HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the response contains any results
        results = response.data.get('results', [])
        self.assertTrue(results, "No results returned")

        # Check if the first result has the specified source without HTML tags
        first_result = results[0] if results else None
        self.assertIsNotNone(first_result, "First result not found")
        self.assertEqual(
            self.strip_tags(first_result['source']), 
            'وزارة المالية', 
            "Source mismatch"
        )
    def test_search_with_year_filter(self):
        search_params = {'q': 'قانون', 'year': '2023'}
        response = self.client.get(reverse('index_page'), data=search_params,
                                HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the response contains any results
        results = response.data.get('results', [])
        self.assertTrue(results, "No results returned")

        # Check if all results have the specified year
        for result in results:
            self.assertEqual(result['official_journal_year'], '2023', "Year mismatch")
    def test_search_with_signature_date_filter(self):
        search_params = {'q': 'قانون', 'signature_date': '2023-05-15'}
        response = self.client.get(reverse('index_page'), data=search_params,
                                HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the response contains any results
        results = response.data.get('results', [])
        self.assertTrue(results, "No results returned")

        # Check if all results have the specified signature date
        for result in results:
            self.assertEqual(result['signature_date'], '2023-05-15', "Signature date mismatch")
    def test_search_with_publication_date_filter(self):
        search_params = {'q': 'قانون', 'publication_date': '1976-01-02'}
        response = self.client.get(reverse('index_page'), data=search_params,
                                HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the response contains any results
        results = response.data.get('results', [])
        self.assertTrue(results, "No results returned")

        # Check if all results have the specified publication date
        for result in results:
            self.assertEqual(result['publication_date'], '1976-01-02', "Publication date mismatch")
    def test_search_with_type_filter(self):
        search_params = {'q': 'قانون', 'type': 'أمر'}
        response = self.client.get(reverse('index_page'), data=search_params,
                                HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if the response contains any results
        results = response.data.get('results', [])
        self.assertTrue(results, "No results returned")

        # Check if all results have the specified type without markup tags
        for result in results:
            self.assertEqual(self.strip_tags(result['type_text']), 'أمر', "Type mismatch")

    def strip_tags(self, html):
    # Fonction pour supprimer les balises HTML d'une chaîne et les balises de marque spécifiques utilisées par Elasticsearch
        import re
        html = re.sub(r'<[^>]*>', '', html)  # Supprimer toutes les balises HTML
        html = html.replace('<mark>', '')  # Supprimer les balises de marque d'ouverture
        html = html.replace('</mark>', '')  # Supprimer les balises de marque de fermeture
        return html
   