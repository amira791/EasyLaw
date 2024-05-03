from django.apps import AppConfig


class DataCollectionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Data_Collection'

    def ready(self):
        import Data_Collection.signals