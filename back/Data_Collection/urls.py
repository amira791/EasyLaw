# from django.contrib import admin
from django.urls import re_path
from . import views

urlpatterns = [
    #re_path('init_scrap_jt', views.initial_jt_filling),
    re_path('index_page', views.search_view.as_view(), name='index_page'),
    re_path('adjusted_search', views.adjusted_search_view.as_view()),
    re_path('index_law', views.search_law.as_view()),
    re_path('types_sources', views.get_type_and_source),
    re_path('years', views.distinct_years),
    re_path('domaine', views.get_interest_domains),
    re_path('details', views.redirect_to_pdf),

    re_path('recentScrap' , views.scrap_recent_juridical_texts) ,



    re_path('updateJT',views.update_juridical_text ) ,
    re_path(r'^scrappings/', views.get_user_scrappings),
    re_path(r'^juridical_texts/(?P<scrapping_id>\d+)/$', views.scrapping_juridical_texts) ,
    re_path('createAdjust',views.create_adjustment ) ,
    re_path(r'^getJT/(?P<id_text>\d+)/$',views.get_juridical_text) ,
    re_path(r'^getJTbyScrappingAndType/(?P<scrapping_id>\d+)/(?P<type_text>[^/]+)/$', views.get_juridical_texts_by_scrapping_and_type,) ,
    re_path(r'^adjustments/(?P<adjusting_num>\w+)/$', views.get_adjusted_juridical_texts, name='get_adjusted_juridical_texts'),

    re_path(r'^adjustment/delete/$', views.delete_adjustment),


]