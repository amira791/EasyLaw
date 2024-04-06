# from django.contrib import admin
from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('test', "hello/"),
    path('user/', include('User.urls')),
]
from django.urls import path, include


