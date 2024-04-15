from django.shortcuts import render
from rest_framework.decorators import api_view
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from rest_framework.response import Response
from rest_framework import status
from .models import OfficialJournal  # Import the OfficialJournal model
import os
from django.http import HttpResponse
from rest_framework import status
from django.http import JsonResponse
import re
import PyPDF2
from PyPDF2 import PdfReader


import time
from datetime import datetime
from .models import JuridicalText, Adjutstement, OfficialJournal
import re
import os
from pdf2image import convert_from_path
import pytesseract
from pytesseract import image_to_string

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\user\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

patterns = [

    
    r'^(?:أمر.*?|أوامر|امر.*?|اوامر)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',


    r'^(?:منشور.*?|مناشير)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',


    r'^(?:منشور.*?\sوزاري.*?\sمشترك.*?|مناشير وزارية مشتركة)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:لائحة.*?|لوائح|لائحتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',
    r'^(?:مداولة.*?|مداولات|مداولتان)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',

    #r'^(مداولة.*?\sم-أ-للدولة.*?)\s(?:رقم\s[\d.-]+?|مؤرخ.*?|مؤرّخ.*?|مؤَرّخ.*?)(?=\s|$)',

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

# patterns = [
#     r'^أمر.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^منشور.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^منشور.*?\sوزاري.*?\sمشترك.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^لائحة.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^مداولة.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^مداولة.*?\sم-أ-للدولة.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^مرسوم.*?\sتنفيذي.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^مرسوم.*?\sتشريعي.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^مرسوم.*?\sرئاسي.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^مقرر.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^مقرر.*?\sوزاري.*?\sمشترك.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^إعلان.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^نظام.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^اتفاقية.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^تصريح.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^تقرير.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^تعليمة.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^تعليمة.*?\sوزارية.*?\sمشتركة.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^جدول.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^رأي.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^قانون.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^قانون.*?\sعضوي.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^قرار.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^قرار.*?\sولائي.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)',
#     r'^قرار.*?\sوزاري.*?\sمشترك.*?\s(?:رقم\s[\d.-]+|مؤرخ.*?)(?=\s|$)'
# ]

@api_view(['POST'])
def ocrTest(request):
    # Assuming 'year' and 'type_text' are passed in the POST request data
    year = '2024'
    #type_text = 'مرسوم تنفيذي'


    # Construct the base directory for PDFs
    base_directory = rf'C:\Users\user\Documents\JOs'

    # Fetch JuridicalText objects based on the provided criteria
    juridical_texts = JuridicalText.objects.filter(
        official_journal__year=year,
    )

    # Iterate over the filtered JuridicalText objects
    # for jt in juridical_texts:
    #     print(f'JO number: {jt.official_journal.number}, page:{jt.official_journal_page}')
    for jt in juridical_texts:
        with open(rf'C:\Users\user\Documents\JTs\{jt.id_text}.txt', 'w', encoding='utf-8') as f:

            # Construct the PDF file path for each JuridicalText
            pdf_file_path = os.path.join(base_directory, year, f'A{year}{jt.official_journal.number:03}.pdf')
            print(f'Processing PDF File: {pdf_file_path } , {jt.official_journal_page}')
            print(rf'saving in txt File: C:\Users\user\Documents\JTs\{jt.id_text}.txt')
            # Extract text from the specific page of the PDF file
            
            extracted_text = extract_text_from_pdf_file(pdf_file_path, jt.official_journal_page)

            nb_matches = 0 
            for pt in patterns : 
                # Define a regular expression pattern to match the desired phrases
                pattern = re.compile(pt, re.MULTILINE)
                # Find all matches in the text
                matches = re.findall(pattern, extracted_text)

                if len(matches) > 0 :
                    nb_matches += len(matches)

            f.write(extracted_text)

            if nb_matches <= 1:
                page = jt.official_journal_page
                stop = False
                pdf_reader = PdfReader(pdf_file_path)
                # Get the number of pages in the PDF
                page_count = len(pdf_reader.pages)
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
                            f.write(extracted_text)
                            break

                    if not stop :
                        f.write(extracted_text) 
                        page = page + 1


            # print(extracted_text)
            print("=" * 50)  # Separator between texts

    # Return a success response
    return HttpResponse({"msg" : "successfuly inserted"}, status = status.HTTP_201_CREATED)


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

    
   
        
    # # Convertir le PDF en une liste d'images
    # images = convert_from_path(tmp_file_path)
    # extracted_text = ""
    # # Parcourir chaque image et extraire le texte
    # for img in images:
    #     text = image_to_string(img, lang='ara')  # 'ara' pour l'arabe
    #     extracted_text += text + '\n'  # Ajouter le texte extrait avec un saut de ligne
        
    # # Écrire le texte extrait dans le fichier de sortie
    # with open('extracted_text.txt', 'w', encoding='utf-8') as f:
    #     f.write(extracted_text)
        
    #     # Supprimer le fichier temporaire
    #     # Notez que le fichier sera automatiquement supprimé lorsque l'objet NamedTemporaryFile sera fermé
    # print(f"Texte extrait et enregistré dans : {'extracted_text.txt'}")






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
    wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/table[1]/tbody/tr/td/a")))

    page_setting = driver.find_element(By.XPATH, "/html/body/div/table[1]/tbody/tr/td/a")
    page_setting.click()

    wait.until(EC.presence_of_element_located((By.XPATH, "//*[@id='b1']/a")))

    input = driver.find_element(By.XPATH, "/html/body/div/form/table[1]/tbody/tr[7]/td[2]/input")
    input.clear()
    input.send_keys('100')

    send = driver.find_element(By.XPATH, "//*[@id='b1']/a")
    send.click()

    wait.until(EC.presence_of_element_located((By.NAME, "znat")))

    # Find the select element
    select_element = Select(driver.find_element(By.NAME, "znat"))

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
    for i in range(3, 4):
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
        

        # Split juridical_texts into smaller lists
        chunk_size = 3000
        juridical_data_chunks = [juridical_texts[i:i + chunk_size] for i in range(0, len(juridical_texts), chunk_size)]

        # Insert juridical_data_chunks into the database
        for chunk in juridical_data_chunks:
            juridical_data = []
            for data in chunk:
                try:
                    official_journal = OfficialJournal.objects.get(number=data['official_journal_number'], year=data['official_journal_year'])
                except OfficialJournal.DoesNotExist:
                    print(data['official_journal_number'], data['official_journal_year'])
                    return HttpResponse({"msg": "Does not exist"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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



















@api_view(['POST'])
def process_files_generator_view(request):
    if request.method == 'POST':
        base_url = 'F:\\project 2cs\\EasyLaw\\back\\jaraid'
        
        # Generator function to process files
        def process_files_generator(base_url):
            # Iterate through directories and files
            for root, dirs, files in os.walk(base_url):
                for file in files:
                    # Extract number and year from file name
                    file_parts = os.path.basename(file).split('.')[0].split('A')
                    
                    # Check if file name matches expected pattern and has enough parts
                    if len(file_parts) >= 2 and file_parts[1]:  # Ensure at least 2 parts and non-empty second part
                        # Split the second part ('2023001') into year (first 4 characters) and number (last 3 characters)
                        year = file_parts[1][:4]  # First 4 characters
                        number = file_parts[1][-3:]  # Last 3 characters
                        
                        # Construct the desired file path format
                        year_directory = os.path.join('/files/JOs', year)
                        file_path = os.path.join(year_directory, file)
                        
                        yield {'number': number, 'year': year, 'file_path': file_path}
        
        # Process the generator to get the results one at a time
        result_generator = process_files_generator(base_url)
        
        # Create a list to hold the results
        results_list = []
        for item in result_generator:
            results_list.append(item)
        
        return Response({'results': results_list}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# Example usage in urls.py
# path('process-files/', process_files_generator_view, name='process_files_generator_view'),






@api_view(['POST'])
def process_files_generator_download(request):
    if request.method == 'POST':
        base_url = 'F:\\project 2cs\\EasyLaw\\back\\jaraid'
        
        # Generator function to process files
        def process_files_generator(base_url):
            # Iterate through directories and files
            for root, dirs, files in os.walk(base_url):
                for file in files:
                    # Extract number and year from file name
                    file_parts = os.path.basename(file).split('.')[0].split('A')
                    
                    # Check if file name matches expected pattern and has enough parts
                    if len(file_parts) >= 2 and file_parts[1]:  # Ensure at least 2 parts and non-empty second part
                        # Split the second part ('2023001') into year (first 4 characters) and number (last 3 characters)
                        year = file_parts[1][:4]  # First 4 characters
                        number = file_parts[1][-3:]  # Last 3 characters
                        
                        # Construct the desired file path format
                        year_directory = os.path.join('/files/JOs', year)
                        file_path = os.path.join(year_directory, file)
                        
                        # Create an instance of OfficialJournal and save to database
                        journal = OfficialJournal(number=number, year=year, text_file=file_path)
                        journal.save()
                        
                        yield {'number': number, 'year': year, 'file_path': file_path}
        
        # Process the generator to get the results one at a time
        result_generator = process_files_generator(base_url)
        
        # Create a list to hold the results
        results_list = []
        for item in result_generator:
            results_list.append(item)
        
        return Response({'message': 'Data saved to database'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    







@api_view(['GET'])
def show_results(request):
    if request.method == 'GET':
        # Retrieve all instances of OfficialJournal from the database
        journals = OfficialJournal.objects.all()

        # Serialize the queryset to JSON format
        serialized_data = [{'number': journal.number, 'year': journal.year, 'file_path': journal.text_file.url} for journal in journals]

        return Response({'results': serialized_data})
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    






@api_view(['POST'])
def process_files_generator_downloadFr(request):
    if request.method == 'POST':
        base_url = 'F:\\project 2cs\\EasyLaw\\back\\jaraid2'
        
        # Generator function to process files
        def process_files_generator(base_url):
            # Iterate through directories and files
            for root, dirs, files in os.walk(base_url):
                for file in files:
                    # Extract number and year from file name
                    file_parts = os.path.basename(file).split('.')[0].split('F')
                    
                    # Check if file name matches expected pattern and has enough parts
                    if len(file_parts) >= 2 and file_parts[1]:  # Ensure at least 2 parts and non-empty second part
                        # Split the second part ('2023001') into year (first 4 characters) and number (last 3 characters)
                        year = file_parts[1][:4]  # First 4 characters
                        number = file_parts[1][-3:]  # Last 3 characters
                        
                        # Construct the desired file path format
                        year_directory = os.path.join('/files/JOs', year)
                        file_path = os.path.join(year_directory, file)
                        
                        # Create an instance of OfficialJournal and save to database
                        journal = OfficialJournal(number=number, year=year, text_file=file_path)
                        journal.save()
                        
                        yield {'number': number, 'year': year, 'file_path': file_path}
        
        # Process the generator to get the results one at a time
        result_generator = process_files_generator(base_url)
        
        # Create a list to hold the results
        results_list = []
        for item in result_generator:
            results_list.append(item)
        
        return Response({'message': 'Data saved to database'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)