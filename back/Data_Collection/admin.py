from django.contrib import admin
from .models import IntrestDomain, JuridicalText, Adjutstement, OfficialJournal, Scrapping

admin.site.register(JuridicalText)
admin.site.register(Adjutstement)
admin.site.register(OfficialJournal)
admin.site.register(Scrapping)
admin.site.register(IntrestDomain)