from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import JuridicalText
from django.core.management import call_command
# for auto index the new data of juridical_text 
@receiver(post_save, sender=JuridicalText)
def update_elasticsearch_index(sender, instance, **kwargs):
    call_command('search_index', '--update')
