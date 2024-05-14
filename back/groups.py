import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "your_project_name.settings")
django.setup()

from django.contrib.auth.models import Group

def create_groups():
    # Create the 'Client' group if it doesn't exist
    client_group, _ = Group.objects.get_or_create(name='Client')
    
    # Create the 'Moderator' group if it doesn't exist
    moderator_group, _ = Group.objects.get_or_create(name='Moderator')

    if client_group and moderator_group:
        print("Groups created successfully.")
    else:
        print("Failed to create groups.")

if __name__ == '__main__':
    create_groups()
