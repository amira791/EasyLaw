from django.shortcuts import render
from rest_framework.decorators import api_view
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import Select
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
from .models import JuridicalText, Adjutstement, OfficialJournal
from django.http import HttpResponse
from rest_framework import status
import re
from .search import lookup
import time
from datetime import datetime
from .models import JuridicalText, Adjutstement, OfficialJournal
import os
# from pdf2image import convert_from_path
# import pytesseract
# from PyPDF2 import PdfReader
# from pytesseract import image_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import JuridicalTextSerializer 

#les expressions réguliéres
# patterns = [
#     r'^(?:أمر.*?|أوامر|امر.*?|اوامر)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:منشور.*?|مناشير)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:منشور.*?\sوزاري.*?\sمشترك.*?|مناشير وزارية مشتركة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:لائحة.*?|لوائح|لائحتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:مداولة.*?|مداولات|مداولتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:مرسوم.*?\sتنفيذي.*?|مراسيم تنفيذية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:مرسوم.*?\sتشريعي.*?|مراسيم تشريعية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:مرسوم.*?\sرئاسي.*?|مراسيم رئاسية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:مقرر.*?|مقررات)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:مقرر.*?\sوزاري.*?\sمشترك.*?|مقررات وزارية مشتركة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:إعلان.*?|اعلان.*?)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:نظام.*?|أنظمة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:اتفاقية.*?|إتفاقيات|إتفاقيتان|إتفاقية|اتفاقيتان|اتفاقيات)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:تصريح.*?|تصاريح)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:تقرير.*?|تقارير)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:تعليمة.*?|تعليمات|تعليمتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:تعليمة.*?\sوزارية.*?\sمشتركة.*?|تعليمات وزارية مشتركة|تعليمتان وزاريتان مشتركتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:جدول.*?|جداول)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:رأي.*?|آراء)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:قانون.*?|قوانين)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:قانون.*?\sعضوي.*?|قوانين عضوية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:قرار.*?|قرارات)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:قرار.*?\sولائي.*?|قرارات ولائية)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
#     r'^(?:قرار.*?\sوزاري.*?\sمشترك.*?|قرارات وزارية مشتركة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)'
# ]
# @api_view(['POST'])
# def ocrTest(request):#text files construction 
#     # Assuming 'year' and 'type_text' are passed in the POST request data
#     year = '2024'
#     #type_text = 'مرسوم تنفيذي'
#     # Construct the base directory for PDFs
#     base_directory = rf'C:\Users\Amatek\Downloads\scrap\pdfs'
#     # Fetch JuridicalText objects based on the provided criteria
#     juridical_texts = JuridicalText.objects.filter(
#         official_journal__year=year,
#     )

#     # Iterate over the filtered JuridicalText objects
#     for jt in juridical_texts:
#         with open(rf'C:\Users\Amatek\Desktop\EasyLaw\V01\EasyLaw\back\Data_Collection\files\JTs\{jt.id_text}.txt', 'w', encoding='utf-8') as f:

#             # Construct the PDF file path for each JuridicalText
#             pdf_file_path = os.path.join(base_directory, year, f'A{year}{jt.official_journal.number:03}.pdf')
#             print(f'Processing PDF File: {pdf_file_path } , {jt.official_journal_page}')
#             print(rf'saving in txt File: C:\Users\Amatek\Desktop\EasyLaw\V01\EasyLaw\back\Data_Collection\files\JTs{jt.id_text}.txt')
#             # Extract text from the specific page of the PDF file
            
#             extracted_text = extract_text_from_pdf_file(pdf_file_path, jt.official_journal_page)

#             nb_matches = 0 
#             for pt in patterns : 
#                 # Define a regular expression pattern to match the desired phrases
#                 pattern = re.compile(pt, re.MULTILINE)
#                 # Find all matches in the text
#                 matches = re.findall(pattern, extracted_text)

#                 if len(matches) > 0 :
#                     nb_matches += len(matches)

#             f.write(extracted_text)

#             if nb_matches <= 1:
#                 page = jt.official_journal_page
#                 stop = False
#                 pdf_reader = PdfReader(pdf_file_path)
#                 # Get the number of pages in the PDF
#                 page_count = len(pdf_reader.pages)
#                 page = page + 1
#                 while not stop and page <= page_count:

#                     extracted_text = extract_text_from_pdf_file(pdf_file_path, page)
#                     for pt in patterns:
#                         # Define a regular expression pattern to match the desired phrases
#                         pattern = re.compile(pt, re.MULTILINE)
#                         # Find all matches in the text
#                         matches = re.findall(pattern, extracted_text)

#                         if len(matches) > 0:
#                             stop = True
#                             match = matches[0]
#                             # Get the index of the first occurrence of the match in the extracted_text
#                             print(match)
#                             match_index = extracted_text.find(match)
                            
#                             if match_index != -1:
#                                 # Remove all text after the match
#                                 extracted_text = extracted_text[:match_index]
#                             f.write(extracted_text)
#                             break

#                     if not stop :
#                         f.write(extracted_text) 
#                         page = page + 1


#             # print(extracted_text)
#             print("=" * 50)  # Separator between texts

#     # Return a success response
#     return HttpResponse({"msg" : "successfuly inserted"}, status = status.HTTP_201_CREATED)
# #the ocr function
# def extract_text_from_pdf_file(pdf_file_path, page_number):
#     # Check if the PDF file exists
#     if os.path.isfile(pdf_file_path):
#         # Convert the specific page of the PDF to an image
#         images = convert_from_path(pdf_file_path, first_page=page_number, last_page=page_number)

#         if images:
#             # Perform OCR on the extracted page using pytesseract
#             extracted_text = pytesseract.image_to_string(images[0], lang='ara')  # OCR for Arabic text

#             return extracted_text
#         else:
#             print(f"Failed to extract page {page_number} from PDF.")
#             return None
#     else:
#         print(f"PDF file not found at {pdf_file_path}")
#         return None
# the search function 
# def search_view(request):
#     query_params = request.GET
#     q = query_params.get('q')
#     context = {}
#     if q is not None:
#         results = lookup(q)
#         context['results'] = results
#         context['query'] = q
#     return render(request, 'search.html', context)

# from django.http import JsonResponse
# from .elasticsearch_utils import lookup  # Import your Elasticsearch lookup function

# def search_view(request):
#     query = request.GET.get('q', '')  # Get the search query from the request
#     if query:
#         results = lookup(query)  # Call your Elasticsearch lookup function
#         return JsonResponse({'results': results})
#     else:
#         return JsonResponse({'error': 'No search query provided'}, status=400)

class search_view(APIView):
        def get(self, request):
         query = request.GET.get('q')
         sort_by = request.GET.get('sort_by', 'relevance')  # Par défaut, tri par pertinence 
         source = request.GET.get('source') 
         year = request.GET.get('year')
         if query:
            results = lookup(query, sort_by='relevance',  # Ou 'publication_date' pour trier par date de publication
  # Filtre par institut de publication
    year='2023',  # Filtre par année de publication
    signitureDateStart='2023-01-01',  # Filtre par date de signature de début
    signitureDateEnd='2023-12-31',  # Filtre par date de signature de fin
    publicationDateStart='2023-01-01',  # Filtre par date de publication de début
    publicationDateEnd='2023-12-31',  # Filtre par date de publication de fin
    # type='votre_type_de_texte',  # Filtre par type de texte
    # ojNumber='votre_numéro_journal_officiel',  # Filtre par numéro du journal officiel
    # jtNumber='votre_numéro_juridique',  # Filtre par numéro juridique
    # jt_source='votre_source_jt',  # Filtre par source JT
    # domain='votre_domaine_de_description'  )# Filtre par domaine de description)
      page=2,  # Page à récupérer
    page_size=3 )# Nombre de résultats par page      
            return Response(results)
         else:
            return Response({'error': 'No search query provided'}, status=400)

# @api_view(['POST'])
# def initial_jt_filling(request):
#     # Initialize WebDriver
#     driver = webdriver.Chrome()

#     # Navigate to the website
#     driver.get("https://www.joradp.dz/HAR/Index.htm")

#     # Switch to the correct frame
#     driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='ATitre.htm']"))

#     # Wait for the link to appear
#     search_link = WebDriverWait(driver, 10).until(
#         EC.visibility_of_element_located(
#             (By.XPATH, "/html/body/div/table[2]/tbody/tr/td[3]/a")
#         )
#     )
#     search_link.click()

#     driver.switch_to.default_content()
#     driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='Accueil.htm']"))

#     # Wait for the page to load
#     wait = WebDriverWait(driver, 10)
#     # wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/table[1]/tbody/tr/td/a")))

#     # page_setting = driver.find_element(By.XPATH, "/html/body/div/table[1]/tbody/tr/td/a")
#     # page_setting.click()

#     # wait.until(EC.presence_of_element_located((By.XPATH, "//*[@id='b1']/a")))

#     # input = driver.find_element(By.XPATH, "/html/body/div/form/table[1]/tbody/tr[7]/td[2]/input")
#     # input.clear()
#     # input.send_keys('100')

#     # send = driver.find_element(By.XPATH, "//*[@id='b1']/a")
#     # send.click()

#     wait.until(EC.presence_of_element_located((By.NAME, "znat")))

#     # Find the select element
#     select_element = Select(driver.find_element(By.NAME, "znat"))

#     # Iterate over each option and scrape the data
#     i = 0
#     juridical_texts = []
#     adjustments_associations = []
#     arabic_month_to_number = {
#         'يناير': '01',
#         'فبراير': '02',
#         'مارس': '03',
#         'أبريل': '04',
#         'مايو': '05',
#         'يونيو': '06',
#         'يوليو': '07',
#         'غشت': '08',
#         'سبتمبر': '09',
#         'أكتوبر': '10',
#         'نوفمبر': '11',
#         'ديسمبر': '12'
#     }
#     # len(select_element.options)
#     for i in range(3, 4):
#         option_text = select_element.options[i].text
#         select_element.options[i].click()  # Select the option
#         # Click on the search button
#         search_button = driver.find_element(By.XPATH, '//*[@id="b1"]/a')
#         search_button.click()

#         # Scraping juridical texts and PDF links
#         wait.until(
#             EC.presence_of_element_located((By.XPATH, "//tr[@bgcolor='#78a7b9']"))
#         )

#         stop = False
#         while not stop:
#             # Get all rows containing information for each juridical text
#             juridical_text_rows = driver.find_elements(
#                 By.XPATH, "//tr[@bgcolor='#78a7b9']"
#             )

#             for row in juridical_text_rows:
#                 # Extract information for each juridical text
#                 text_number = row.find_element(By.TAG_NAME, "a").get_attribute("title")
#                 number_match = re.search(r'(\d+)', text_number)
#                 text_id = number_match.group(1)
#                 information_rows = row.find_elements(
#                     By.XPATH, "./following-sibling::tr[position()<5]"
#                 )
#                 # Initialize dictionary
#                 info_dict = {}
#                 info_dict["id_text"] = text_id
#                 info_dict["type_text"] = option_text
#                 if "الجريدة الرسمية" in information_rows[1].text:
#                     information_rows.insert(1, None)
#                 # Extract signature date from row1
#                 signature_date_match = re.search(r"\d+\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{4}",
#                                                     information_rows[0].text)
#                 if signature_date_match:
#                     signature_date = signature_date_match.group()
#                     # Extract Arabic month name and convert it to its numerical representation
#                     arabic_month = signature_date_match.group(1)
#                     numerical_month = arabic_month_to_number[arabic_month]
#                     # Extract day and year
#                     day_year_match = re.search(r"(\d+)\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+(\d{4})", signature_date)
#                     if day_year_match:
#                         day = day_year_match.group(1)
#                         year = day_year_match.group(3)
#                         # Convert to DD/MM/YYYY format
#                         day_month_year = f"{year}-{numerical_month}-{day}"
#                         info_dict["signature_date"] = day_month_year
#                     else: info_dict["signature_date"] = None
#                 else: info_dict["signature_date"] = None
                
#                 jt_number_match = re.search(r'رقم (\d+-\d+)', information_rows[0].text)

#                 if jt_number_match:
#                     jt_number = jt_number_match.group(1)
#                     info_dict["jt_number"] = jt_number
#                 else: info_dict["jt_number"] = None

#                 if information_rows[1]:
#                     info_dict["source"] = information_rows[1].text
#                 else:
#                     info_dict["source"] = None

#                 # Extract official journal information from row3
#                 page_match = re.search(r'الصفحة (\d+)', information_rows[2].text)
#                 number_match = re.search(r'عدد (\d+)', information_rows[2].text)

#                 if number_match:
#                     info_dict["official_journal_number"] = number_match.group(1)
#                 else: info_dict["official_journal_number"] = None
#                 if page_match : 
#                     info_dict["official_journal_page"] = None

                
#                 jo_date_match = re.search(r"\d+\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{4}",
#                                                     information_rows[2].text)
                
#                 if jo_date_match:
#                     jo_date = jo_date_match.group()
#                     # Extract Arabic month name and convert it to its numerical representation
#                     arabic_month = jo_date_match.group(1)
#                     numerical_month = arabic_month_to_number[arabic_month]
#                     # Extract day and year
#                     day_year_match = re.search(r"(\d+)\s+(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|غشت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+(\d{4})", jo_date)
#                     if day_year_match:
#                         day = day_year_match.group(1)
#                         year = day_year_match.group(3)
#                         # Convert to DD/MM/YYYY format
#                         day_month_year = f"{year}-{numerical_month}-{day}"
#                         info_dict["publication_date"] = day_month_year
#                     else: info_dict["publication_date"] = None
#                 else: info_dict['publication_date'] = None
            
#                 if info_dict['publication_date'] :
#                     # Extract description from row4
#                     info_dict["description"] = information_rows[3].text
#                     date_object = datetime.strptime(info_dict["publication_date"], '%Y-%m-%d')
#                     info_dict["official_journal_year"] = date_object.year
#                     info_dict["text_file"] = f'/files/JTs/{info_dict["id_text"]}.txt'

#                     juridical_texts.append(info_dict)

#             adjustments = driver.find_elements(
#                 By.XPATH, "//tr[./td[@bgcolor='#9ec7d7']]"
#             )

#             # Iterate over each row with a specific bgcolor attribute
#             for row in adjustments:
#                 # Find the preceding row with the specified conditions
#                 preceding_row = row.find_element(
#                     By.XPATH,
#                     "preceding-sibling::tr[./td[@colspan='5'] and ./td/font[@color='Maroon']][1]",
#                 )

#                 # Extract information from the preceding row
#                 keyword = preceding_row.find_element(
#                     By.XPATH, "./td[2]/font"
#                 ).text.strip()

#                 # Extract information from the current row
#                 adjusting_text_number = row.find_element(
#                     By.TAG_NAME, "a"
#                 ).get_attribute("title")

#                 number_match = re.search(r'(\d+)', adjusting_text_number)
#                 adjusting_text_id = number_match.group(1)

#                 adjusted_text = row.find_element(
#                     By.XPATH, "preceding-sibling::tr[@bgcolor='#78a7b9'][1]"
#                 )
#                 adjusted_text_number = adjusted_text.find_element(
#                     By.TAG_NAME, "a"
#                 ).get_attribute("title")

#                 number_match = re.search(r'(\d+)', adjusted_text_number)
#                 adjusted_text_id = number_match.group(1)

#                 adj_dict = {
#                     "adjusted_num": adjusted_text_id,
#                     "adjustment_type": keyword,
#                     "adjusting_num": adjusting_text_id,
#                 }
#                 adjustments_associations.append(adj_dict)
#             next_page_button = driver.find_elements(
#                 By.XPATH, "//a[contains(@href, \"Sauter('a',3)\")]"
#             )
#             if len(next_page_button) > 0:
#                 next_page_button[0].click()
#             else:
#                 stop = True
        
#         error_element = driver.find_elements(By.CSS_SELECTOR, "h1")

#         # Check if the element's text matches
#         if len(error_element) > 0 and error_element[0].text == "Erreur de serveur":
#             return HttpResponse({"msg" : "crashed website"}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
        

#         # Split juridical_texts into smaller lists
#         chunk_size = 3000
#         juridical_data_chunks = [juridical_texts[i:i + chunk_size] for i in range(0, len(juridical_texts), chunk_size)]

#         # Insert juridical_data_chunks into the database
#         for chunk in juridical_data_chunks:
#             juridical_data = []
#             for data in chunk:
#                 try:
#                     official_journal = OfficialJournal.objects.get(number=data['official_journal_number'], year=data['official_journal_year'])
#                 except OfficialJournal.DoesNotExist:
#                     print(data['official_journal_number'], data['official_journal_year'])
#                     return HttpResponse({"msg": "Does not exist"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#                 jt = JuridicalText(
#                     id_text=data['id_text'],
#                     type_text=data['type_text'],
#                     signature_date=data['signature_date'],
#                     publication_date=data['publication_date'],
#                     jt_number=data['jt_number'],
#                     source=data['source'],
#                     official_journal=official_journal,
#                     official_journal_page=data['official_journal_page'],
#                     description=data['description'],
#                     text_file=data['text_file']
#                 )
#                 juridical_data.append(jt)

#             # Bulk create the instances into the database
#             JuridicalText.objects.bulk_create(juridical_data)

#         # Split adjustments_associations into smaller lists
#         adjustment_data_chunks = [adjustments_associations[i:i + chunk_size] for i in range(0, len(adjustments_associations), chunk_size)]

#         # Insert adjustment_data_chunks into the database
#         for chunk in adjustment_data_chunks:
#             adjustment_data = []
#             for data in chunk:
#                 # Create Adjustment instances using retrieved JuridicalText instances
#                 adjustment = Adjutstement(
#                     adjusted_num=data['adjusted_num'],
#                     adjusting_num=data['adjusting_num'],
#                     adjustment_type=data['adjustment_type']
#                 )
#                 adjustment_data.append(adjustment)

#             # Bulk create the instances into the database
#             Adjutstement.objects.bulk_create(adjustment_data)


#         juridical_texts = []
#         adjustments_associations = []

#         print(f'{option_text} inserted')

#         driver.switch_to.default_content()
#         driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='ATitre.htm']"))

#         # Wait for the link to appear
#         search_link = WebDriverWait(driver, 10).until(
#             EC.visibility_of_element_located(
#                 (By.XPATH, "/html/body/div/table[2]/tbody/tr/td[3]/a")
#             )
#         )
#         search_link.click()

#         driver.switch_to.default_content()
#         driver.switch_to.frame(driver.find_element(By.XPATH, "//frame[@src='Accueil.htm']"))

#         wait.until(EC.presence_of_element_located((By.NAME, "znat")))

#         # Find the select element
#         select_element = Select(driver.find_element(By.NAME, "znat"))
#         i = i+1
#     # Close the WebDriver
#     driver.quit()
#     return HttpResponse({"msg" : "successfuly inserted"}, status = status.HTTP_201_CREATED)

#     # Create your views here.