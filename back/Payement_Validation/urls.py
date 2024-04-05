from django.urls import path
from . import views

urlpatterns = [
    path('customer', views.addUser),
    path('subscribe', views.subscribe),
    path('subscribtion', views.getsubscription),
    path('invoice', views.getinvoices),
    path('service', views.getServices),
]