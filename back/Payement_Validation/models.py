from django.db import models

from User.models import CustomUser as User


class Access(models.Model):
    id = models.IntegerField(primary_key=True, auto_created=True)
    code = models.CharField(max_length=10)
    nom = models.CharField(max_length=50)

    def __str__(self):
        return self.nom


class Service(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    nom = models.CharField(max_length=50)
    description =  models.TextField()
    tarif = models.FloatField()
    priceId = models.CharField(max_length=30)
    accesses = models.ManyToManyField(Access)

    def __str__(self):
        return self.nom


class Facture(models.Model):
    id = models.CharField(max_length=30, primary_key=True)
    date = models.DateField()
    montant = models.FloatField()
    montant_payé = models.FloatField()
    payé = models.BooleanField()
    methode_de_payment = models.CharField(max_length=20, null=True)
    pdf = models.TextField()

    def __str__(self):
        return self.id


class Abonnement(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    dateDebut = models.DateField()
    dateFin = models.DateField()
    statut = models.CharField(max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    facture = models.OneToOneField(Facture, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.user.username + " on " + self.service.nom



class DomainInterets(models.Model):
    id = models.IntegerField(primary_key=True)
    nom = models.CharField(max_length=30)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.nom