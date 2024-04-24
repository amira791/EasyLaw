from django.urls import path
from . import views

urlpatterns = [
    path('customer', views.addUser, name = 'customer'),
    path('subscribe', views.subscribe, name = 'subscribe'),
    path('subscribtion', views.getsubscription, name = 'subsciption'),
    path('service', views.getServices, name = 'service'),
    path('invoice', views.getinvoices, name = 'invoice'),
]
