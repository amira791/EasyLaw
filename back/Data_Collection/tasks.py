import os
from django.core.files import File
from django.core.files.base import ContentFile
from .models import JuridicalText

def fill_extracted_text():
    juridical_texts = JuridicalText.objects.all()
    
    for juridical_text in juridical_texts:
        text_file_name = f"{juridical_text.id_text}.txt"
        text_file_path = os.path.join('C:\\Users\\Amatek\\Desktop\\projet\\EasyLaw\\back\\Data_Collection\\files\\JTs\\JTs', text_file_name)
        
        if os.path.exists(text_file_path):
            with open(text_file_path, 'r', encoding='utf-8') as file:
                text_content = file.read()
            juridical_text.extracted_text = text_content
            juridical_text.save()
        else:
            print(f"File not found for JuridicalText ID: {juridical_text.id_text}")

# Call the function to fill the extracted_text field
fill_extracted_text()
