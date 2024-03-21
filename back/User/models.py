from django.db import models


class client(models.Model):
    ROLE_CHOICES = (
        ('client', 'Client'),
        ('moderateur', 'Moderateur'),
    )

    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField()
    numTelephone = models.CharField(max_length=20)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    dateNaiss = models.DateField()
    lieuNaiss = models.CharField(max_length=255)
    univer_Entrep = models.CharField(max_length=255)
    occupation = models.CharField(max_length=255)

    def __str__(self):
        return self.username

# Create your models here.
