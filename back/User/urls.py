# from django.contrib import admin
from django.urls import path, re_path
from . import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('get_user_info', views.get_user_info),
    re_path('edit_user_info', views.edit_user_info),
    re_path('change_password', views.change_password),
    re_path('logout', views.logout),
    re_path('allUsers', views.allUsers),
    re_path('createMod', views.createMod),
    path('activateUser', views.activateUser),
    path('blockUser', views.blockUser),
    path('warnUser', views.warnUser),
    path('isWarned', views.isWarned),
    # re_path('test_token', views.test_token)
]