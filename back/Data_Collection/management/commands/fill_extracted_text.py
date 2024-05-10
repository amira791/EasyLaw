import os
from django.core.management.base import BaseCommand
from ...models import JuridicalText

class Command(BaseCommand):
    help = 'Fill the extracted_text field in JuridicalText with content from text files'

    def handle(self, *args, **options):
        juridical_texts = JuridicalText.objects.all()

        for juridical_text in juridical_texts:
          if juridical_text.extracted_text is None or juridical_text.extracted_text.strip() == '':
            text_file_name = f"{juridical_text.id_text}.txt"
            text_file_path = os.path.join('C:\\Users\\Amatek\\Desktop\\projet\\EasyLaw\\back\\Data_Collection\\files\\JTs\\JTs', text_file_name)

            if os.path.exists(text_file_path):
                with open(text_file_path, 'r', encoding='utf-8') as file:
                    text_content = file.read()
                juridical_text.extracted_text = text_content
                juridical_text.save()
            else:
                self.stdout.write(self.style.WARNING(f"File not found for JuridicalText ID: {juridical_text.id_text}"))
        else:
                self.stdout.write(self.style.WARNING(f"JuridicalText ID: {juridical_text.id_text} already has extracted text"))