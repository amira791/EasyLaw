# from django.contrib import admin
from django.urls import re_path
from . import views

urlpatterns = [
    #re_path('init_scrap_jt', views.initial_jt_filling),
    re_path('index_page', views.search_view.as_view()),
    re_path('index_law', views.search_law.as_view()),
    re_path('types_sources', views.get_type_and_source),
    re_path('years', views.distinct_years),
    #re_path('Ocr', views.ocrTest),
    re_path('details', views.redirect_to_pdf),
    re_path('recent_scrapping', views.scrap_recent_juridical_texts),
]
