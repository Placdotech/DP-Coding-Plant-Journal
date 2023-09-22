from django.urls import path
from .import views

urlpatterns = [
    
    path("", views.start, name='start'),        # rediected to 'home'
    path("home/", views.home, name='home'),
    path("login/", views.login, name='login'),
    path("logout/", views.logout, name='logout'),
    path("diary", views.diary, name='diary'),
    path("contact", views.contact, name='contact'),
    path("ranking", views.ranking, name='ranking'),
    path("signup/", views.signup, name='signup'),
    path('impressum/', views.impressum, name='impressum'),
    path('privacy_policy/', views.privacy_policy, name='privacy_policy'),    
    path('check_available/', views.check_username, name='check_username'),      #checks username by registration
    path("diary/create_entry/", views.create_entry, name='create_entry'),
]
