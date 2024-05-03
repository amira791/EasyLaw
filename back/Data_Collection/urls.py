# from django.contrib import admin
from django.urls import re_path
from . import views

urlpatterns = [
    #re_path('init_scrap_jt', views.initial_jt_filling),
    re_path('index_page', views.search_view.as_view()),
    #re_path('Ocr', views.ocrTest),
]
