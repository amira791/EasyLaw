from django.shortcuts import render
from pdf2image import convert_from_path
from rest_framework.decorators import api_view, permission_classes
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PyPDF2 import PdfReader ,PdfWriter
from django.http import FileResponse
from datetime import datetime
from .models import IntrestDomain, JuridicalText, Adjutstement, OfficialJournal, Scrapping

from User.models import CustomUser
from .models import JuridicalText, Adjutstement, OfficialJournal, Scrapping
from django.http import HttpResponse
from rest_framework import status
import re
from .search import lookup
from .searchlow import lookuplaw
import time
from datetime import datetime
from .models import JuridicalText, Adjutstement, OfficialJournal
from django.http import JsonResponse
from django.http import HttpResponseRedirect
import os
import requests
import PyPDF2
import json
from pdf2image import convert_from_path
import pytesseract
#from PyPDF2 import PdfReader
#from pytesseract import image_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import JuridicalTextSerializer 
from .serializers import AdjustmentSerializer, JuridicalTextSerializer, ScrappingSerializer 

from rest_framework.permissions import IsAuthenticated
from .search import get_real_page_number
from permissions import is_Allowed
from fuzzywuzzy import process
from .classifier import get_text_clf

#les expressions réguliéres
patterns = [
    r'^(?:أمر.*?|أوامر|امر.*?|اوامر)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:منشور.*?|مناشير)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:منشور.*?\sوزاري.*?\sمشترك.*?|مناشير وزارية مشتركة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:لائحة.*?|لوائح|لائحتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:مداولة.*?|مداولات|مداولتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:مرسوم.*?\sتنفيذي.*?|مراسيم تنفيذية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:مرسوم.*?\sتشريعي.*?|مراسيم تشريعية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:مرسوم.*?\sرئاسي.*?|مراسيم رئاسية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:مقرر.*?|مقررات)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:مقرر.*?\sوزاري.*?\sمشترك.*?|مقررات وزارية مشتركة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:إعلان.*?|اعلان.*?)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:نظام.*?|أنظمة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:اتفاقية.*?|إتفاقيات|إتفاقيتان|إتفاقية|اتفاقيتان|اتفاقيات)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:تصريح.*?|تصاريح)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:تقرير.*?|تقارير)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:تعليمة.*?|تعليمات|تعليمتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:تعليمة.*?\sوزارية.*?\sمشتركة.*?|تعليمات وزارية مشتركة|تعليمتان وزاريتان مشتركتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:جدول.*?|جداول)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:رأي.*?|آراء)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:قانون.*?|قوانين)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:قانون.*?\sعضوي.*?|قوانين عضوية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:قرار.*?|قرارات)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:قرار.*?\sولائي.*?|قرارات ولائية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:قرار.*?\sوزاري.*?\sمشترك.*?|قرارات وزارية مشتركة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)'
]



@api_view(['POST'])
def initial_jt_filling(request):
    # Initialize WebDriver
    driver = webdriver.Chrome()

    # Navigate to the website
    driver.get("https://www.joradp.dz/HAR/Index.htm")

    # Switch to the correct frame
    driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='ATitre.htm']"))

    # Wait for the link to appear
    search_link = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(
            (By.XPATH, "/html/body/div/table[2]/tbody/tr/td[3]/a")
        )
    )
    search_link.click()

    driver.switch_to.default_content()
    driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='Accueil.htm']"))

    # Wait for the page to load
    wait = WebDriverWait(driver, 10)
    # wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/table[1]/tbody/tr/td/a")))

    # page_setting = driver.find_element(By.XPATH, "/html/body/div/table[1]/tbody/tr/td/a")
    # page_setting.click()

    # wait.until(EC.presence_of_element_located((By.XPATH, "//*[@id='b1']/a")))

    # input = driver.find_element(By.XPATH, "/html/body/div/form/table[1]/tbody/tr[7]/td[2]/input")
    # input.clear()
    # input.send_keys('100')

    # send = driver.find_element(By.XPATH, "//*[@id='b1']/a")
    # send.click()

    wait.until(EC.presence_of_element_located((By.NAME, "znat")))

    # Find the select element
    select_element = Select(driver.find_element(By.NAME, "znat"))

    starting_date_input = driver.find_element(By.XPATH, "/html/body/div/form/table[1]/tbody/tr[8]/td[2]/input[1]") 
    starting_date_input.clear()
    starting_date_input.send_keys('01/01/2001')

    ending_date_input = driver.find_element(By.XPATH, "/html/body/div/form/table[1]/tbody/tr[8]/td[2]/input[2]") 
    ending_date_input.clear()
    ending_date_input.send_keys('10/03/2024')

    # Iterate over each option and scrape the data
    i = 0
    juridical_texts = []
    adjustments_associations = []
    arabic_month_to_number = {
        'يناير': '01',
        'فبراير': '02',
        'مارس': '03',
        'أبريل': '04',
        'مايو': '05',
        'يونيو': '06',
        'يوليو': '07',
        'غشت': '08',
        'سبتمبر': '09',
        'أكتوبر': '10',
        'نوفمبر': '11',
        'ديسمبر': '12'
    }
    # len(select_element.options)
    for i in range(26, 27):
        option_text = select_element.options[i].text
        select_element.options[i].click()  # Select the option
        # Click on the search button
        search_button = driver.find_element(By.XPATH, '//*[@id="b1"]/a')
        search_button.click()

        # Scraping juridical texts and PDF links
        wait.until(
            EC.presence_of_element_located((By.XPATH, "//tr[@bgcolor='#78a7b9']"))
        )

        stop = False
        while not stop:
            # Get all rows containing information for each juridical text
            juridical_text_rows = driver.find_elements(
                By.XPATH, "//tr[@bgcolor='#78a7b9']"
            )

            for row in juridical_text_rows:
                # Extract information for each juridical text
                text_number = row.find_element(By.TAG_NAME, "a").get_attribute("title")
                number_match = re.search(r'(\d+)', text_number)
                text_id = number_match.group(1)
                information_rows = row.find_elements(
                    By.XPATH, "./following-sibling::tr[position()<5]"
                )
                # Initialize dictionary
                info_dict = {}
                info_dict["id_text"] = text_id
                info_dict["type_text"] = option_text
                if "الجريدة الرسمية" in information_rows[1].text:
                    information_rows.insert(1, None)
                # Extract signature date from row1
                signature_date_match = re.search(r"\d+\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{4}",
                                                    information_rows[0].text)
                if signature_date_match:
                    signature_date = signature_date_match.group()
                    # Extract Arabic month name and convert it to its numerical representation
                    arabic_month = signature_date_match.group(1)
                    numerical_month = arabic_month_to_number[arabic_month]
                    # Extract day and year
                    day_year_match = re.search(r"(\d+)\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+(\d{4})", signature_date)
                    if day_year_match:
                        day = day_year_match.group(1)
                        year = day_year_match.group(3)
                        # Convert to DD/MM/YYYY format
                        day_month_year = f"{year}-{numerical_month}-{day}"
                        info_dict["signature_date"] = day_month_year
                    else: info_dict["signature_date"] = None
                else: info_dict["signature_date"] = None
                
                jt_number_match = re.search(r'رقم (\d+-\d+)', information_rows[0].text)

                if jt_number_match:
                    jt_number = jt_number_match.group(1)
                    info_dict["jt_number"] = jt_number
                else: info_dict["jt_number"] = None

                if information_rows[1]:
                    info_dict["source"] = information_rows[1].text
                else:
                    info_dict["source"] = None

                # Extract official journal information from row3
                page_match = re.search(r'الصفحة (\d+)', information_rows[2].text)
                number_match = re.search(r'عدد (\d+)', information_rows[2].text)

                if number_match:
                    info_dict["official_journal_number"] = number_match.group(1)
                else: info_dict["official_journal_number"] = None


                if page_match : 
                    info_dict["official_journal_page"] = page_match.group(1)
                else :
                    info_dict["official_journal_page"] = None

                
                jo_date_match = re.search(r"\d+\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{4}",
                                                    information_rows[2].text)
                
                if jo_date_match:
                    jo_date = jo_date_match.group()
                    # Extract Arabic month name and convert it to its numerical representation
                    arabic_month = jo_date_match.group(1)
                    numerical_month = arabic_month_to_number[arabic_month]
                    # Extract day and year
                    day_year_match = re.search(r"(\d+)\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+(\d{4})", jo_date)
                    if day_year_match:
                        day = day_year_match.group(1)
                        year = day_year_match.group(3)
                        # Convert to DD/MM/YYYY format
                        day_month_year = f"{year}-{numerical_month}-{day}"
                        info_dict["publication_date"] = day_month_year
                    else: info_dict["publication_date"] = None
                else: info_dict['publication_date'] = None
            
                if info_dict['publication_date'] :
                    # Extract description from row4
                    info_dict["description"] = information_rows[3].text
                    date_object = datetime.strptime(info_dict["publication_date"], '%Y-%m-%d')
                    info_dict["official_journal_year"] = date_object.year
                    info_dict["text_file"] = f'/files/JTs/{info_dict["id_text"]}.txt'

                    juridical_texts.append(info_dict)

            adjustments = driver.find_elements(
                By.XPATH, "//tr[./td[@bgcolor='#9ec7d7']]"
            )

            # Iterate over each row with a specific bgcolor attribute
            for row in adjustments:
                # Find the preceding row with the specified conditions
                preceding_row = row.find_element(
                    By.XPATH,
                    "preceding-sibling::tr[./td[@colspan='5'] and ./td/font[@color='Maroon']][1]",
                )

                # Extract information from the preceding row
                keyword = preceding_row.find_element(
                    By.XPATH, "./td[2]/font"
                ).text.strip()

                # Extract information from the current row
                adjusting_text_number = row.find_element(
                    By.TAG_NAME, "a"
                ).get_attribute("title")

                number_match = re.search(r'(\d+)', adjusting_text_number)
                adjusting_text_id = number_match.group(1)

                adjusted_text = row.find_element(
                    By.XPATH, "preceding-sibling::tr[@bgcolor='#78a7b9'][1]"
                )
                adjusted_text_number = adjusted_text.find_element(
                    By.TAG_NAME, "a"
                ).get_attribute("title")

                number_match = re.search(r'(\d+)', adjusted_text_number)
                adjusted_text_id = number_match.group(1)

                adj_dict = {
                    "adjusted_num": adjusted_text_id,
                    "adjustment_type": keyword,
                    "adjusting_num": adjusting_text_id,
                }
                adjustments_associations.append(adj_dict)
            next_page_button = driver.find_elements(
                By.XPATH, "//a[contains(@href, \"Sauter('a',3)\")]"
            )
            if len(next_page_button) > 0:
                next_page_button[0].click()
            else:
                stop = True
        
        error_element = driver.find_elements(By.CSS_SELECTOR, "h1")

        # Check if the element's text matches
        if len(error_element) > 0 and error_element[0].text == "Erreur de serveur":
            return HttpResponse({"msg" : "crashed website"}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        print("wchbiiiik")

        # Split juridical_texts into smaller lists
        chunk_size = 3000
        juridical_data_chunks = [juridical_texts[i:i + chunk_size] for i in range(0, len(juridical_texts), chunk_size)]

        # Insert juridical_data_chunks into the database
        for chunk in juridical_data_chunks:
            juridical_data = []
            for data in chunk:
                try:
                    official_journal = OfficialJournal.objects.get(number=data['official_journal_number'], year=data['official_journal_year'])
                    jt = JuridicalText(
                        id_text=data['id_text'],
                        type_text=data['type_text'],
                        signature_date=data['signature_date'],
                        publication_date=data['publication_date'],
                        jt_number=data['jt_number'],
                        source=data['source'],
                        official_journal=official_journal,
                        official_journal_page=data['official_journal_page'],
                        description=data['description'],
                        text_file=data['text_file']
                    )
                    juridical_data.append(jt)
                except OfficialJournal.DoesNotExist:
                    print(data)
            # Bulk create the instances into the database
            JuridicalText.objects.bulk_create(juridical_data)
        

        # Split adjustments_associations into smaller lists
        adjustment_data_chunks = [adjustments_associations[i:i + chunk_size] for i in range(0, len(adjustments_associations), chunk_size)]

        # Insert adjustment_data_chunks into the database
        for chunk in adjustment_data_chunks:
            adjustment_data = []
            for data in chunk:
                # Create Adjustment instances using retrieved JuridicalText instances
                adjustment = Adjutstement(
                    adjusted_num=data['adjusted_num'],
                    adjusting_num=data['adjusting_num'],
                    adjustment_type=data['adjustment_type']
                )
                adjustment_data.append(adjustment)

            # Bulk create the instances into the database
            Adjutstement.objects.bulk_create(adjustment_data)


        juridical_texts = []
        adjustments_associations = []

        print(f'{option_text} inserted')

        driver.switch_to.default_content()
        driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='ATitre.htm']"))

        # Wait for the link to appear
        search_link = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located(
                (By.XPATH, "/html/body/div/table[2]/tbody/tr/td[3]/a")
            )
        )
        search_link.click()

        driver.switch_to.default_content()
        driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='Accueil.htm']"))

        wait.until(EC.presence_of_element_located((By.NAME, "znat")))

        # Find the select element
        select_element = Select(driver.find_element(By.NAME, "znat"))
        i = i+1
    # Close the WebDriver
    driver.quit()
    return HttpResponse({"msg" : "successfuly inserted"}, status = status.HTTP_201_CREATED)
    # Create your views here.









def extract_text_from_pdf_file(pdf_file_path, page_number):
     # Check if the PDF file exists
    if os.path.isfile(pdf_file_path):
         # Convert the specific page of the PDF to an image
        images = convert_from_path(pdf_file_path, first_page=page_number, last_page=page_number)

        if images:
             # Perform OCR on the extracted page using pytesseract
            extracted_text = pytesseract.image_to_string(images[0], lang='ara')  # OCR for Arabic text

            return extracted_text
        else:
            print(f"Failed to extract page {page_number} from PDF.")
            return None
    else:
        print(f"PDF file not found at {pdf_file_path}")
        return None
# search function 
@permission_classes([IsAuthenticated])
class search_view(APIView):
        def get(self, request):
             if is_Allowed(request.user.id, "search") or (request.user.role == "moderateur"):
                 # Récupérer les paramètres de recherche depuis la requête GET
                  query = request.GET.get('q')
                  sort_by=request.GET.get('sort_by')
                  source = request.GET.get('source')
                  year = request.GET.get('year')
                  searching_way=request.GET.get('searching_way')
                  signature_date = request.GET.get('signature_date')
                  publication_date = request.GET.get('publication_date')
                  type = request.GET.get('type')
                  ojNumber = request.GET.get('ojNumber')
                  jtNumber = request.GET.get('jtNumber')
                  domain = request.GET.get('domain')
                  page = int(request.GET.get('page', 1))  # Default to page 1
                  page_size = int(request.GET.get('page_size', 50))  # Default to 10 results per page
                  print("Query:", query)
                  print("Sort By:", sort_by)
                  print("Source:", source)
                  print("Year:", year)
                  print("Signature Date:", signature_date)
                  print("Publication Date:", publication_date)
                  print("Type:", type)
                  print("OJ Number:", ojNumber)
                  print("JT Number:", jtNumber)
                  print("Domain:", domain)
                  if query:
                     results , len = lookup(query=query,sort_by=sort_by, source=source, year=year,searching_way=searching_way,
                     signature_date=signature_date, publication_date=publication_date,
                     type=type, ojNumber=ojNumber, jtNumber=jtNumber, domain=domain, page=page,page_size=page_size)
                     return Response({'results': results, 'len': len}, status=200)
                     
                  else:
                     return Response({'error': 'No search query provided'}, status=400)
             else:
                   return Response({'message':'You are not allowed to search'}, status=status.HTTP_403_FORBIDDEN)
@permission_classes([IsAuthenticated])
class search_law(APIView):
        def get(self, request):
             if is_Allowed(request.user.id, "search") or (request.user.role == "moderateur"):
                 # Récupérer les paramètres de recherche depuis la requête GET
                  query = request.GET.get('q')
                  sort_by=request.GET.get('sort_by')
                  source = request.GET.get('source')
                  year = request.GET.get('year')
                  searching_way=request.GET.get('searching_way')
                  signature_date = request.GET.get('signature_date')
                  publication_date = request.GET.get('publication_date')
                  type = request.GET.get('type')
                  ojNumber = request.GET.get('ojNumber')
                  jtNumber = request.GET.get('jtNumber')
                  domain = request.GET.get('domain')
                  page = int(request.GET.get('page', 1))  # Default to page 1
                  page_size = int(request.GET.get('page_size', 50))  # Default to 10 results per page
                  print("Query:", query)
                  print("Sort By:", sort_by)
                  print("Source:", source)
                  print("Year:", year)
                  print("Signature Date:", signature_date)
                  print("Publication Date:", publication_date)
                  print("Type:", type)
                  print("OJ Number:", ojNumber)
                  print("JT Number:", jtNumber)
                  print("Domain:", domain)
                  if query:
                     results , len = lookuplaw(query=query,sort_by=sort_by, source=source, year=year,searching_way=searching_way,
                     signature_date=signature_date, publication_date=publication_date,
                     type=type, ojNumber=ojNumber, jtNumber=jtNumber, domain=domain, page=page,page_size=page_size)
                     return Response({'results': results, 'len': len}, status=200)
                  else:
                     return Response({'error': 'No search query provided'}, status=400)
             else:
                   return Response({'message':'You are not allowed to search'}, status=status.HTTP_403_FORBIDDEN)
# fonction pour recupere les sources et types 
def get_type_and_source(request):
    types = JuridicalText.objects.values_list('type_text', flat=True).distinct()
    sources = JuridicalText.objects.values_list('source', flat=True).distinct()
    return JsonResponse({'types': list(types), 'sources': list(sources)})
def distinct_years(request):
    distinct_years_list = OfficialJournal.objects.values_list('year', flat=True).distinct().order_by('year')
    years = list(distinct_years_list)
    return JsonResponse({'years': years})
#details de juridical text

def redirect_to_pdf(request):
    # Get the query parameters from the request
    official_journal_year = request.GET.get('official_journal_year')
    official_journal_number = request.GET.get('official_journal_number')
    official_journal_page = request.GET.get('official_journal_page')

    if official_journal_year and official_journal_number and official_journal_page:
        # Format official_journal_number to ensure it has three digits
        formatted_journal_number = official_journal_number.zfill(3)
        year_prefix = 'A' if int(official_journal_year) >= 1964 else 'F'
        # Generate the PDF file path
        pdf_directory = f"C:\\Users\\Manel\\Desktop\\2CS\\S2\\PROJET\\TP\\pdfs\\{official_journal_year}"
        pdf_filename = f"{year_prefix}{official_journal_year}{formatted_journal_number}.pdf"  # Assuming this format
        pdf_path = os.path.join(pdf_directory, pdf_filename)
        
        # Check if the PDF file exists
        if os.path.exists(pdf_path):
            # Open the PDF file and set response headers for displaying in the browser
            response = FileResponse(open(pdf_path, 'rb'), content_type='application/pdf')

            # Set the initial page to be displayed
            page_to_display = int(official_journal_page)
            response['Accept-Ranges'] = 'bytes'
            response['Content-Disposition'] = f'inline; filename="{pdf_filename}"'

            # Calculate the content range based on the requested page
            with open(pdf_path, 'rb') as pdf_file:
                # Set the file pointer to the start of the requested page
                pdf_file.seek((page_to_display - 1) * 1024 * 1024)
                # Read 1 MB of content starting from the requested page
                page_content = pdf_file.read(1024 * 1024)
                # Calculate the content range for the requested page
                start_byte = (page_to_display - 1) * 1024 * 1024
                end_byte = start_byte + len(page_content) - 1
                response['Content-Range'] = f'bytes {start_byte}-{end_byte}/{os.path.getsize(pdf_path)}'

            return response
        else:
            # Handle the case where the PDF file does not exist
            return HttpResponse("Le fichier PDF demandé n'existe pas.", status=404)
    else:
        # Handle the case where parameters are missing
        return HttpResponse("Paramètres manquants.", status=400)





def extract_text_from_pdf_file(pdf_file_path, page_number):
    # Check if the PDF file exists
    if os.path.isfile(pdf_file_path):
        # Convert the specific page of the PDF to an image
        images = convert_from_path(pdf_file_path, first_page=page_number, last_page=page_number)

        if images:
            # Perform OCR on the extracted page using pytesseract
            extracted_text = pytesseract.image_to_string(images[0], lang='ara')  # OCR for Arabic text

            return extracted_text
        else:
            print(f"Failed to extract page {page_number} from PDF.")
            return None
    else:
        print(f"PDF file not found at {pdf_file_path}")
        return None

def find_all_occurrences(extracted_text, match):
    # Initialize an empty list to store the indexes of all occurrences
    match_indexes = []

    # Start index for search
    start_index = 0

    # Iterate over the extracted text to find all occurrences of the match
    while True:
        # Find the next occurrence of the match starting from the current start_index
        match_index = extracted_text.find(match, start_index)
        
        # If no further occurrence is found, break the loop
        if match_index == -1:
            break
        
        if (match_index - 1 > 0 and extracted_text[match_index-1] == '\n') or match_index == 0:
            # Append the match index to the list
            match_indexes.append(match_index)
        
        # Update the start_index for the next iteration
        start_index = match_index + len(match)

    # Return the list of all match indexes
    return match_indexes


def first_page_verifications(text, target_string, re_matches_list):

    continue_ocr = True 
    start_index = 0
    next_jt_index = None

    print(re_matches_list)

    # Splitting the text into individual lines
    lines = text.strip().split('\n')

    # Finding the most similar string to the target_string (description)
    most_similar, similarity_degree = process.extractOne(target_string, lines)

    line_index = lines.index(most_similar)
    start_index = max(0, line_index - 6)
    del lines[:start_index]
    relevant_text = '\n'.join(lines)
    
    desc_index = relevant_text.find(most_similar)

    dif = float('inf')
    for m in re_matches_list:
        jt_indexes = find_all_occurrences(relevant_text, m)
        for jt_index in jt_indexes:
            if jt_index > desc_index :
                if continue_ocr:
                    print("setting continue ocr false")
                    continue_ocr = False
                if jt_index-desc_index < dif:
                    next_jt_index = jt_index

    if next_jt_index:
        relevant_text = relevant_text[:next_jt_index]

    return continue_ocr, relevant_text

def ocr(jt : JuridicalText):

    # Construct the base directory for PDFs
    base_directory = rf'C:\Users\user\Documents\JOs'
    json_file_path = r'C:\Users\user\Desktop\EasyLaw_versions\V00.1\EasyLaw\back\sheetsresult.json'

    with open(json_file_path, 'r') as file:
        data = json.load(file)
    # Construct the PDF file path for each JuridicalText
    pdf_file_path = os.path.join(base_directory, str(jt.official_journal.year), f'A{jt.official_journal.year}{jt.official_journal.number:03}.pdf')

    # Extract text from the specific page of the PDF file
    pdf_reader = PdfReader(pdf_file_path)

    # Get the number of pages in the PDF
    page_count = len(pdf_reader.pages)
    if jt.official_journal.year < 1993 :
        real_page_number = get_real_page_number(jt.official_journal.year, jt.official_journal.number, jt.official_journal_page, data)
    else: 
        real_page_number = jt.official_journal_page
    
    print(type(real_page_number), real_page_number)
    print(type(page_count), page_count)
    if real_page_number <= page_count :
        extracted_text = extract_text_from_pdf_file(pdf_file_path, real_page_number)
        re_matches_list = []
        for pt in patterns:
            # Define a regular expression pattern to match the desired phrases
            pattern = re.compile(pt, re.MULTILINE)
            # Find all matches in the text
            matches = re.findall(pattern, extracted_text)
            if len(matches) > 0:
                re_matches_list.extend(matches)

        conitue_ocr, extracted_text = first_page_verifications(extracted_text, jt.description, re_matches_list)

        if conitue_ocr:
            page = real_page_number
            stop = False
            
            page = page + 1
            while not stop and page <= page_count:
                extracted_text = extract_text_from_pdf_file(pdf_file_path, page)
                for pt in patterns:
                    # Define a regular expression pattern to match the desired phrases
                    pattern = re.compile(pt, re.MULTILINE)
                    # Find all matches in the text
                    matches = re.findall(pattern, extracted_text)
                    if len(matches) > 0:
                        stop = True
                        match = matches[0]
                        # Get the index of the first occurrence of the match in the extracted_text
                        print(match)
                        match_index = extracted_text.find(match)
                        if match_index != -1:
                            # Remove all text after the match
                            extracted_text = extracted_text[:match_index]
                        break
                if not stop:
                    page = page + 1
    print(f'Ocr of {jt.id_text} completed')

    return extracted_text


def scrap_jaraid():
    # Base URL for the PDF files
    base_url = 'https://www.joradp.dz/FTP/JO-ARABE/'

    # Base path to save PDFs 
    base_path = r'C:\Users\user\Documents\JOs' # changer le path des pdf ici 

    # Function to download PDF file and return the filename if downloaded
    def download_pdf(pdf_url, save_path):
        if not os.path.isfile(save_path):  # Check if the file doesn't already exist
            response = requests.get(pdf_url)
            if response.status_code == 200:
                with open(save_path, 'wb') as file:
                    file.write(response.content)
            else:
                return False

        return True  # Return None if the file was not downloaded

    # List to store the filenames of downloaded PDFs
    downloaded_files = []

    year = datetime.now().year

    # Determine the maximum PDF number for each year (you need to know this information)
    max_pdf_number = 150  # Update this with the actual maximum PDF number for each year
    max_tries = 10

    # Create directory for the year if it doesn't exist
    year_directory = os.path.join(base_path, str(year))
    os.makedirs(year_directory, exist_ok=True)

    # Iterate through PDF numbers
    for pdf_number in range(1, max_pdf_number + 1):
        # Construct URL for the PDF file
        pdf_url = f'{base_url}{year}/A{year}{str(pdf_number).zfill(3)}.pdf'
    
        save_path = os.path.join(year_directory, f'A{year}{str(pdf_number).zfill(3)}.pdf')

        downloaded_file = False
        attempts = 0
        # Download the PDF file and add the filename to the list if downloaded
        while not downloaded_file and attempts <= max_tries:
            downloaded_file = download_pdf(pdf_url, save_path)
            attempts = attempts+1
        if downloaded_file:
            file_path = f'/files/JOs/{year}/A{year}{str(pdf_number).zfill(3)}.pdf'
            downloaded_files.append({"year": year, "number": pdf_number, "file_path": file_path})
        else: 
            return False
    

    # Print the list of downloaded files if not empty
    if len(downloaded_files) > 0:
        # List to hold instances to be created
        official_journal_entries = []

        # Prepare the OfficialJournal instances
        for file_info in downloaded_files:

            # Create an OfficialJournal instance (without saving it yet)
            official_journal = OfficialJournal(
                number=file_info['number'],
                year=file_info['year'],
                text_file=file_info["file_path"]
            )
            official_journal_entries.append(official_journal)

        # Use bulk_create to insert all entries at once
        OfficialJournal.objects.bulk_create(official_journal_entries)

    return True


@api_view(['POST'])
def scrap_recent_juridical_texts(request):

    #try:
    #     scrap_jaraid()
    # except Exception as e:
    #     print(f"An error occurred: {e}")
    #     return HttpResponse({"msg": "Error occured when scrapping official journals"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Initialize WebDriver
    try : 
        driver = webdriver.Chrome()
        # Navigate to the website
        driver.get("https://www.joradp.dz/HAR/Index.htm")

        # Switch to the correct frame
        driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='ATitre.htm']"))

        # Wait for the link to appear
        search_link = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located(
                (By.XPATH, "/html/body/div/table[2]/tbody/tr/td[3]/a")
            )
        )
        search_link.click()

        driver.switch_to.default_content()
        driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='Accueil.htm']"))

        # Wait for the page to load
        wait = WebDriverWait(driver, 10)
    
        wait.until(EC.presence_of_element_located((By.NAME, "znat")))

        max_publication_date = JuridicalText.objects.get_max_publication_date()
        #formatted_date_start = max_publication_date.strftime('%d/%m/%Y')
        
        today = datetime.today()
        formated_date_end = today.strftime('%d/%m/%Y')

        #print(formatted_date_start, formated_date_end)

        starting_date_input = driver.find_element(By.XPATH, "/html/body/div/form/table[1]/tbody/tr[8]/td[2]/input[1]") 
        starting_date_input.clear()
        starting_date_input.send_keys('02/05/2024')

        ending_date_input = driver.find_element(By.XPATH, "/html/body/div/form/table[1]/tbody/tr[8]/td[2]/input[2]") 
        ending_date_input.clear()
        ending_date_input.send_keys(formated_date_end)


        # Iterate over each option and scrape the data
        i = 0
        juridical_texts = []
        adjustments_associations = []
        arabic_month_to_number = {
            'يناير': '01',
            'فبراير': '02',
            'مارس': '03',
            'أبريل': '04',
            'مايو': '05',
            'يونيو': '06',
            'يوليو': '07',
            'غشت': '08',
            'سبتمبر': '09',
            'أكتوبر': '10',
            'نوفمبر': '11',
            'ديسمبر': '12'
        }
        # Click on the search button
        search_button = driver.find_element(By.XPATH, '//*[@id="b1"]/a')
        search_button.click()
    except TimeoutException:
        return HttpResponse({"msg": "crashed website"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        print(f"An error occurred: {e}")
        return HttpResponse({"msg": "an error occured during the scraping"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    try:
        # Wait for the presence of the element
        wait.until(EC.presence_of_element_located((By.XPATH, "//tr[@bgcolor='#78a7b9']")))
    except TimeoutException:
        return HttpResponse({"msg": "crashed website"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        print(f"An error occurred: {e}")
        return HttpResponse({"msg": "an error occured during the scraping"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try: 
        text_clf = get_text_clf()
        stop = False
        while not stop:
            error_element = driver.find_elements(By.CSS_SELECTOR, "h1")

            # Check if the element's text matches
            if len(error_element) > 0 and error_element[0].text == "Erreur de serveur":
                return HttpResponse({"msg" : "crashed website"}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
            # Get all rows containing information for each juridical text
            juridical_text_rows = driver.find_elements(
                By.XPATH, "//tr[@bgcolor='#78a7b9']"
            )
                
            for row in juridical_text_rows:
                # Extract information for each juridical text
                text_number = row.find_element(By.TAG_NAME, "a").get_attribute("title")
                number_match = re.search(r'(\d+)', text_number)
                text_id = number_match.group(1)
                information_rows = row.find_elements(
                    By.XPATH, "./following-sibling::tr[position()<5]"
                )
                # Initialize dictionary
                info_dict = {}
                info_dict["id_text"] = text_id
                type_match = re.search(r'(.*?)\s(?:رقم|ممضي)', information_rows[0].text)
                info_dict["type_text"] = type_match.group(1)
                if "الجريدة الرسمية" in information_rows[1].text:
                    information_rows.insert(1, None)
                # Extract signature date from row1
                signature_date_match = re.search(r"\d+\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{4}",
                                                    information_rows[0].text)
                if signature_date_match:
                    signature_date = signature_date_match.group()
                    # Extract Arabic month name and convert it to its numerical representation
                    arabic_month = signature_date_match.group(1)
                    numerical_month = arabic_month_to_number[arabic_month]
                    # Extract day and year
                    day_year_match = re.search(r"(\d+)\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+(\d{4})", signature_date)
                    if day_year_match:
                        day = day_year_match.group(1)
                        year = day_year_match.group(3)
                        # Convert to DD/MM/YYYY format
                        day_month_year = f"{year}-{numerical_month}-{day}"
                        info_dict["signature_date"] = day_month_year
                    else: info_dict["signature_date"] = None
                else: info_dict["signature_date"] = None
                
                jt_number_match = re.search(r'رقم (\d+-\d+)', information_rows[0].text)

                if jt_number_match:
                    jt_number = jt_number_match.group(1)
                    info_dict["jt_number"] = jt_number
                else: info_dict["jt_number"] = None

                if information_rows[1]:
                    info_dict["source"] = information_rows[1].text
                else:
                    info_dict["source"] = None

                # Extract official journal information from row3
                page_match = re.search(r'الصفحة (\d+)', information_rows[2].text)
                number_match = re.search(r'عدد (\d+)', information_rows[2].text)

                if number_match:
                    info_dict["official_journal_number"] = number_match.group(1)
                else: info_dict["official_journal_number"] = None

                if page_match : 
                    info_dict["official_journal_page"] = page_match.group(1)
                else :
                    info_dict["official_journal_page"] = None

                
                jo_date_match = re.search(r"\d+\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{4}",
                                                    information_rows[2].text)
                
                if jo_date_match:
                    jo_date = jo_date_match.group()
                    # Extract Arabic month name and convert it to its numerical representation
                    arabic_month = jo_date_match.group(1)
                    numerical_month = arabic_month_to_number[arabic_month]
                    # Extract day and year
                    day_year_match = re.search(r"(\d+)\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+(\d{4})", jo_date)
                    if day_year_match:
                        day = day_year_match.group(1)
                        year = day_year_match.group(3)
                        # Convert to DD/MM/YYYY format
                        day_month_year = f"{year}-{numerical_month}-{day}"
                        info_dict["publication_date"] = day_month_year
                    else: info_dict["publication_date"] = None
                else: info_dict['publication_date'] = None
            
                if info_dict['publication_date'] :
                    # Extract description from row4
                    info_dict["description"] = information_rows[3].text
                    date_object = datetime.strptime(info_dict["publication_date"], '%Y-%m-%d')
                    info_dict["official_journal_year"] = date_object.year
                    info_dict["text_file"] = f'/files/JTs/{info_dict["id_text"]}.txt'

                    juridical_texts.append(info_dict)

            adjustments = driver.find_elements(
                By.XPATH, "//tr[./td[@bgcolor='#9ec7d7']]"
            )

            # Iterate over each row with a specific bgcolor attribute
            for row in adjustments:
                # Find the preceding row with the specified conditions
                preceding_row = row.find_element(
                    By.XPATH,
                    "preceding-sibling::tr[./td[@colspan='5'] and ./td/font[@color='Maroon']][1]",
                )

                # Extract information from the preceding row
                keyword = preceding_row.find_element(
                    By.XPATH, "./td[2]/font"
                ).text.strip()

                # Extract information from the current row
                adjusting_text_number = row.find_element(
                    By.TAG_NAME, "a"
                ).get_attribute("title")

                number_match = re.search(r'(\d+)', adjusting_text_number)
                adjusting_text_id = number_match.group(1)

                adjusted_text = row.find_element(
                    By.XPATH, "preceding-sibling::tr[@bgcolor='#78a7b9'][1]"
                )
                adjusted_text_number = adjusted_text.find_element(
                    By.TAG_NAME, "a"
                ).get_attribute("title")

                number_match = re.search(r'(\d+)', adjusted_text_number)
                adjusted_text_id = number_match.group(1)

                adj_dict = {
                    "adjusted_num": adjusted_text_id,
                    "adjustment_type": keyword,
                    "adjusting_num": adjusting_text_id,
                }
                adjustments_associations.append(adj_dict)
            next_page_button = driver.find_elements(
                By.XPATH, "//a[contains(@href, \"Sauter('a',3)\")]"
            )
            if len(next_page_button) > 0:
                next_page_button[0].click()
            else:
                stop = True 

        # Split juridical_texts into smaller lists
        chunk_size = 3000
        juridical_data_chunks = [juridical_texts[i:i + chunk_size] for i in range(0, len(juridical_texts), chunk_size)]

        query_response = []
        # Insert juridical_data_chunks into the database
        for chunk in juridical_data_chunks:
            juridical_data = []
            for data in chunk:
                try:
                    official_journal = OfficialJournal.objects.get(number=data['official_journal_number'], year=data['official_journal_year'])
                    jt = JuridicalText(
                        id_text=data['id_text'],
                        type_text=data['type_text'],
                        signature_date=data['signature_date'],
                        publication_date=data['publication_date'],
                        jt_number=data['jt_number'],
                        source=data['source'],
                        official_journal=official_journal,
                        official_journal_page=int(data['official_journal_page']),
                        description=data['description'],
                        text_file=data['text_file']
                    )
                    extracted_text = ocr(jt)
                    jt.extracted_text = extracted_text
                    domain_name = text_clf.predict([jt.description])[0]
                    jt.intrest = IntrestDomain.objects.get(name = domain_name)
                    data['extrated_text'] = extracted_text
                    data['intrest_domain'] = domain_name
                    query_response.append(data)
                    juridical_data.append(jt)
                except OfficialJournal.DoesNotExist:
                    print(data['official_journal_number'], data['official_journal_year'])
            # Bulk create the instances into the database
            JuridicalText.objects.bulk_create(juridical_data)
        

        # Split adjustments_associations into smaller lists
        adjustment_data_chunks = [adjustments_associations[i:i + chunk_size] for i in range(0, len(adjustments_associations), chunk_size)]

        # Insert adjustment_data_chunks into the database
        for chunk in adjustment_data_chunks:
            adjustment_data = []
            for data in chunk:
                # Create Adjustment instances using retrieved JuridicalText instances
                adjustment = Adjutstement(
                    adjusted_num=data['adjusted_num'],
                    adjusting_num=data['adjusting_num'],
                    adjustment_type=data['adjustment_type']
                )
                adjustment_data.append(adjustment)

            # Bulk create the instances into the database
            Adjutstement.objects.bulk_create(adjustment_data)

        print("data inserted")

        # Close the WebDriver
        driver.quit()
        return HttpResponse(query_response, status = status.HTTP_201_CREATED)
        # Create your views here.
    except Exception as e:
        print(f"An error occurred: {e}")
        return HttpResponse({"msg": "an error occured during the scraping"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        






@api_view(['POST'])
def update_juridical_text(request):
    id_text = request.data.get('id_text')
    if not id_text:
        return Response({"error": "id_text is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        juridical_text = JuridicalText.objects.get(id_text=id_text)
    except JuridicalText.DoesNotExist:
        return Response({"error": "JuridicalText not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = JuridicalTextSerializer(juridical_text, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_user_scrappings(request, user_id):
    try:
        scrappings = Scrapping.objects.filter(user_id=user_id)
        serializer = ScrappingSerializer(scrappings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    



@api_view(['GET'])
def scrapping_juridical_texts(request, scrapping_id):
    try:
        scrapping = Scrapping.objects.get(id=scrapping_id)
        juridical_texts = JuridicalText.objects.filter(scrapping=scrapping)
        serializer = JuridicalTextSerializer(juridical_texts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Scrapping.DoesNotExist:
        return Response({"error": "Scrapping does not exist"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    




@api_view(['POST'])
def create_adjustment(request):
    # Check if the request method is POST
    if request.method == 'POST':
        # Deserialize the JSON data from the request body
        data = request.data

        # Create a serializer instance with the request data
        serializer = AdjustmentSerializer(data=data)

        # Validate the serializer data
        if serializer.is_valid():
            # Save the validated data to create the Adjustment object
            adjustment = serializer.save()

            # Return a success response with the created Adjustment data
            return Response({'message': 'Adjustment created successfully', 'adjustment': serializer.data}, status=201)
        else:
            # Return an error response with serializer errors
            return Response(serializer.errors, status=400)
    else:
        # Return an error response for unsupported request methods
        return Response({'error': 'Method not allowed'}, status=405)
    



@api_view(['GET'])
def get_juridical_text(request, id_text):
    try:
        juridical_text = JuridicalText.objects.get(id_text=id_text)
    except JuridicalText.DoesNotExist:
        return Response({'error': 'JuridicalText not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = JuridicalTextSerializer(juridical_text)
    return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(['GET'])
def get_juridical_texts_by_scrapping_and_type(request, scrapping_id, type_text):
    juridical_texts = JuridicalText.objects.filter(scrapping_id=scrapping_id, type_text=type_text)
    if not juridical_texts.exists():
        return Response({'error': 'No JuridicalText found with the given scrapping_id and type_text'}, status=status.HTTP_404_NOT_FOUND)

    serializer = JuridicalTextSerializer(juridical_texts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)