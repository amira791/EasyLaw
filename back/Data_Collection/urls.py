# from django.contrib import admin
from os import path
from django.urls import re_path
from . import views

urlpatterns = [
    re_path('init_scrap_jt', views.initial_jt_filling),
    re_path('init_scrap_pdfs', views.process_files_generator_view),
    re_path('init_dwnl_pdfs', views.process_files_generator_download),
    re_path('fr', views.process_files_generator_downloadFr),
    re_path('showJresult', views.show_results),
    re_path('ocr1993', views.ocrTestbefore1993),

    re_path('ocr', views.ocrTest),


    re_path('types_sources', views.get_type_and_source),
    re_path('years', views.distinct_years),
    #re_path('Ocr', views.ocrTest),
    re_path('details', views.redirect_to_pdf),



    re_path('journals/open-pdf/(?P<year>\d+)/(?P<number>\d+)/$', views.open_pdf_directly, name='open_pdf_directly'),
    re_path('journals/number/(?P<year>\d+)/$', views.get_numbers_for_year, name='get_numbers_for_year'),
    re_path('journals/years/$', views.get_distinct_years, name='get_distinct_years'),

    


    
]
