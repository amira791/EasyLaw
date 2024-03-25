from django.contrib import admin
from .models import JuridicalText, Adjutstement, OfficialJournal

# Register your models here.
admin.site.register(JuridicalText)
admin.site.register(Adjutstement)
admin.site.register(OfficialJournal)