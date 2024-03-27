from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Client

class ClientAdmin(UserAdmin):
    model = Client
    list_display = ['username', 'email', 'numTelephone', 'role', 'nom', 'prenom', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation', 'is_active', 'is_staff']
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('numTelephone', 'role', 'nom', 'prenom', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'numTelephone', 'role', 'nom', 'prenom', 'dateNaiss', 'lieuNaiss', 'univer_Entrep', 'occupation', 'is_active', 'is_staff', 'is_superuser')}
        ),
    )
    search_fields = ['email', 'username']
    ordering = ['email']

admin.site.register(Client, ClientAdmin)