# from django.contrib import admin
from django.urls import re_path
from . import views

urlpatterns = [
    re_path('init_scrap_jt', views.initial_jt_filling),
]
