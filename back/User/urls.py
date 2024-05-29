# from django.contrib import admin
from django.urls import path, re_path
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('get_user_info', views.get_user_info),
    re_path('edit_user_info', views.edit_user_info),
    re_path('change_password', views.change_password),
    re_path('logout', views.logout),
    re_path('allUsers', views.allUsers),
    re_path('createMod', views.createMod),
    path('activateUser', views.activateUser),
    path('blockUser', views.blockUser),
    # re_path('test_token', views.test_token)
    # path('custom-app/verify/<str:uidb64>/<str:token>/', views.confirm_email, name='confirm-email'),
    path('custom-app/verify/<str:uidb64>/<str:token>/', views.confirm_email, name='confirm-email'),

    re_path('create_domaine', views.create_domaine_interet),
    re_path('add_domaine_interet', views.add_domaine_interet),
    re_path('delete_domaine_interet', views.delete_domaine_interet),
    re_path('get_domaines_interet', views.get_domaines_interet_for_user),
    re_path('domaines_interet', views.get_all_domaines_interet),
]
