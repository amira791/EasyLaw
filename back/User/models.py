from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import Group, Permission


#########################################old model###############################################
# class CustomUser(AbstractUser):

#     ROLE_CHOICES = (
#         ('client', 'Client'),
#         ('moderateur', 'Moderateur'),
#     )

#     email = models.EmailField(unique=True)
#     nom = models.CharField(max_length=255, null=True)
#     prenom = models.CharField(max_length=255, null=True)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client')
#     num_telephone = models.CharField(max_length=20, null=True)
#     dateNaiss = models.DateField(null=True, blank=True)
#     lieuNaiss = models.CharField(max_length=255, null=True)
#     univer_Entrep = models.CharField(max_length=255, null=True)
#     occupation = models.CharField(max_length=255, null=True)
#     bio = models.TextField(max_length=500, blank=True)
#     location = models.CharField(max_length=100, blank=True)
#     profile_picture = models.ImageField(upload_to='profile_pics/', blank=True)



#     def __str__(self):
#         return self.username
#########################################   Old model   ###############################################


class CustomUser(AbstractUser):

    email = models.EmailField(unique=True)
    nom = models.CharField(max_length=255, null=True)
    prenom = models.CharField(max_length=255, null=True)
    num_telephone = models.CharField(max_length=20, null=True)
    dateNaiss = models.DateField(null=True, blank=True)
    lieuNaiss = models.CharField(max_length=255, null=True)
    univer_Entrep = models.CharField(max_length=255, null=True)
    occupation = models.CharField(max_length=255, null=True)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null= True)


    def __str__(self):
        return self.username



class UserProfileBase(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    groups = models.ManyToManyField(Group)
    user_permissions = models.ManyToManyField(Permission)

    class Meta:
        abstract = True

    def __str__(self):
        return self.user.username

class Client(UserProfileBase):
    id_client = models.AutoField(primary_key=True)



class Moderateur(UserProfileBase):
    id_moderateur = models.AutoField(primary_key=True)


