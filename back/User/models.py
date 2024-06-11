from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('moderateur', 'Moderateur'),
        ('admin', 'Admin'),
    )

    ACTIVE = 'Active'
    NOT_ACTIVE = 'Not Active'

    email = models.EmailField(unique=True)
    nom = models.CharField(max_length=255, null=True)
    prenom = models.CharField(max_length=255, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
    num_telephone = models.CharField(max_length=20, null=True)
    dateNaiss = models.DateField(null=True, blank=True)
    lieuNaiss = models.CharField(max_length=255, null=True)
    univer_Entrep = models.CharField(max_length=255, null=True)
    occupation = models.CharField(max_length=255, null=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)
    stripeCustomerId = models.CharField(max_length=30)
    warned = models.BooleanField(default= False)
    etat = models.CharField(max_length=255, null=True)


    def __str__(self):
        return self.username
    



