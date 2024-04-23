from django.core.management.base import BaseCommand
from ...models import JuridicalText
import os

class Command(BaseCommand):
    help = "Extracts text from associated files and populates the 'extracted_text' field for JuridicalText objects."

    def handle(self, *args, **options):
        base_path = r'C:\Users\Amatek\Desktop\EasyLaw\V01\EasyLaw\back\Data_Collection\files\JTs'
        for text_object in JuridicalText.objects.all():
            if text_object.text_file:
                # Construct full file path using os.path.join (similar to models.py)
                full_file_path = os.path.join(base_path, f"{text_object.id_text}.txt")
                print(f"Checking file path: {full_file_path}")  # Debugging print statement
                # Check if the file exists before trying to open and read it
                if os.path.exists(full_file_path):
                    # Open and read the file
                    with open(full_file_path, 'r', encoding='utf-8') as f:
                        text_content = f.read()
                    # Update the extracted_text field
                    text_object.extracted_text = text_content
                    text_object.save()
                    self.stdout.write(f"Processed JuridicalText: {text_object.id_text}")
                else:
                    self.stdout.write(f"File not found for JuridicalText: {text_object.id_text}")
            else:
                self.stdout.write(f"No text file associated with JuridicalText: {text_object.id_text}")
