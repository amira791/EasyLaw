# from django.contrib import admin
from django.urls import re_path
from . import views

urlpatterns = [
    re_path('init_scrap_jt', views.initial_jt_filling),
    re_path('init_scrap_pdfs', views.process_files_generator_view),
    re_path('init_dwnl_pdfs', views.process_files_generator_download),
    re_path('fr', views.process_files_generator_downloadFr),
    re_path('showJresult', views.show_results
),



    
]
