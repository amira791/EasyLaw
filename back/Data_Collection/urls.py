# from django.contrib import admin
from django.urls import re_path
from . import views

urlpatterns = [
    #re_path('init_scrap_jt', views.initial_jt_filling),
    re_path('index_page', views.search_view.as_view(), name='index_page'),
    re_path('types_sources', views.get_type_and_source),
    re_path('years', views.distinct_years),
    re_path('domaine', views.get_interest_domains),
    re_path('details', views.redirect_to_pdf),
]
