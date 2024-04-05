from django.contrib.auth.models import User
from django.db import models

class Service(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    nom = models.CharField(max_length=50)
    description =  models.TextField()
    tarif = models.FloatField()
    priceId = models.CharField(max_length=30)

    def __str__(self):
        return self.nom

class Facture(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    date = models.DateField()
    montant = models.FloatField()
    montant_payé = models.FloatField()
    montant_restant = models.FloatField()

    def __str__(self):
        return self.id


class Abonnement(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    dateDebut = models.DateField()
    dateFin = models.DateField()
    statut = models.CharField(max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.OneToOneField(Service, on_delete=models.CASCADE)
    facture = models.OneToOneField(Facture, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.user.username + " on " + self.service.nom


