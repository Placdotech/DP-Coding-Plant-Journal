from django.urls import path
from .import views

urlpatterns = [
    path("", views.home, name='home'),
    path("/diary", views.diary, name='diary')
]