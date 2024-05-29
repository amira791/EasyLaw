from django.contrib.auth.models import AbstractUser
from django.db import models


from Data_Collection.models import IntrestDomain

    
class CustomUser(AbstractUser):

    ROLE_CHOICES = (
        ('client', 'Client'),
        ('moderateur', 'Moderateur'),
        ('admin', 'Admin'),
    )

    ACTIVE = 'Active'
    NOT_ACTIVE = 'Not Active'
    ETAT_CHOICES = [
        (ACTIVE, 'Active'),
        (NOT_ACTIVE, 'Not Active'),
    ]


    email = models.EmailField(unique=True)
    etat = models.CharField(max_length=20, choices=ETAT_CHOICES, null=True)
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
    is_active = models.BooleanField(default=False)
    domaines_interet = models.ManyToManyField(IntrestDomain, related_name='utilisateurs', blank=True)


    def add_domaine_interet(self, domaine):
        if self.domaines_interet.count() < 5:
            self.domaines_interet.add(domaine)
            return True
        else:
            return False

    def delete_domaine_interet(self, domaine):
        self.domaines_interet.remove(domaine)

    def get_domaines_interet(self):
        return self.domaines_interet.all()




    def __str__(self):
        return self.username
    


