from django.urls import path
from . import views

urlpatterns = [
    #path('customer', views.addUser, name = 'customer'),
    path('subscribe', views.subscribe, name = 'subscribe'),
    path('subscribtion', views.getsubscription, name = 'subsciption'),
    path('service', views.getServices, name = 'service'),
    path('addService', views.addService, name = 'addService'),
    path('invoice', views.getinvoices, name = 'invoice'),
    path('access', views.getAccesses, name = 'access'),
    path('price', views.changePrice, name = 'price'),
]