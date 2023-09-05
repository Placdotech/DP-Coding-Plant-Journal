from django.urls import path
from .import views

urlpatterns = [
    path("", views.home, name='home'),
    path("diary", views.diary, name='diary'),
    path("contact", views.contact, name='contact'),
    path("ranking", views.ranking, name='ranking'),
    path('contact_request/', views.contact_request, name='contact_request')
]