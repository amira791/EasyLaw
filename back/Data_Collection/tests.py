import unittest
from django.test import TestCase
from rest_framework.test import APIClient
from elasticsearch import Elasticsearch
from .search import lookup
from .models import JuridicalText

class TestLookupFunction(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.elastic_client = Elasticsearch(hosts=['http://localhost:9200/'])
        JuridicalText.objects.create(
            id_text='1',
            type_text='Type 1',
            signature_date='2024-05-30',
            publication_date='2024-05-30',
            jt_number='JT-1',
            source='Source 1',
            official_journal_page=1,
            description='Description 1',
            extracted_text='Extracted Text 1',
            official_journal_id=1
        )
        JuridicalText.objects.create(
            id_text='2',
            type_text='Type 2',
            signature_date='2024-05-31',
            publication_date='2024-05-31',
            jt_number='JT-2',
            source='Source 2',
            official_journal_page=2,
            description='Description 2',
            extracted_text='Extracted Text 2',
            official_journal_id=2
        )
    def test_lookup_without_query(self):
        query = ""
        results, results_length = lookup(query)
        self.assertEqual(results, [])
        self.assertEqual(results_length, 0)
