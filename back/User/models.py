from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):

    ROLE_CHOICES = (
        ('client', 'Client'),
        ('moderateur', 'Moderateur'),
    )

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



    def __str__(self):
        return self.username
    







# ROLE_CHOICES = (
#     ('client', 'Client'),
#     ('moderateur', 'Moderateur'),
# )

# class CustomUser(AbstractUser):
#     # Custom fields for extended attributes
#     num_telephone = models.CharField(max_length=20, null=True)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
#     nom = models.CharField(max_length=255, null=True)
#     prenom = models.CharField(max_length=255, null=True)
#     dateNaiss = models.DateField(null=True, blank=True)
#     lieuNaiss = models.CharField(max_length=255, null=True)
#     univer_Entrep = models.CharField(max_length=255, null=True)
#     occupation = models.CharField(max_length=255, null=True)

#     # Fields from the original CustomUser model
   
#     bio = models.TextField(max_length=500, blank=True)
#     location = models.CharField(max_length=100, blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)

#     def create_user(self, username, email, password, num_telephone=None, role='client', nom=None,
#                     prenom=None, dateNaiss=None, lieuNaiss=None, univer_Entrep=None, occupation=None, **extra_fields):
#         """
#         Create and return a new user instance with the given username, email, password, and additional fields.
#         """
#         if not username:
#             raise ValueError('The username must be set')
#         if not email:
#             raise ValueError('The email must be set')
#         email = self.normalize_email(email)
#         user = self.model(username=username, email=email, num_telephone=num_telephone, role=role,
#                             nom=nom, prenom=prenom, dateNaiss=dateNaiss, lieuNaiss=lieuNaiss,
#                             univer_Entrep=univer_Entrep, occupation=occupation, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def __str__(self):
#         return self.username

#     class Meta:
#         app_label = 'auth'
