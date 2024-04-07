from django.contrib.auth.models import AbstractUser, Permission
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


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
    


# # Custom permissions
# class ClientPermissions(models.Model):
#     class Meta:
#         managed = False  # This model is not managed by Django's migrations

#     @staticmethod
#     def get_permissions():
#         return ['view_client_data', 'edit_client_data']

# class ModeratorPermissions(models.Model):
#     class Meta:
#         managed = False  # This model is not managed by Django's migrations

#     @staticmethod
#     def get_permissions():
#         return ['moderate_content', 'manage_users']

# # Signal to assign permissions to users based on their role
# @receiver(post_save, sender=CustomUser)
# def assign_permissions(sender, instance, created, **kwargs):
#     if created:
#         if instance.role == 'client':
#             permissions = ClientPermissions.get_permissions()
#         elif instance.role == 'moderateur':
#             permissions = ModeratorPermissions.get_permissions()
#         else:
#             permissions = []

#         for permission_code in permissions:
#             permission = Permission.objects.get(codename=permission_code)
#             instance.user_permissions.add(permission)

# class Client(CustomUser):
    
#     pass

# class Moderateur(CustomUser):
   
#     pass