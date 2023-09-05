from django.shortcuts import render
from django.http import JsonResponse
from .models import *
import json
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect


# Create your views here.

def home(request):
    return render(request, 'sites/home.html')

def diary(request):
    return render(request, 'sites/diary.html')

def contact(request):
    return render(request, 'sites/contact.html')

def ranking(request):
    return render(request, 'sites/ranking.html')

def contact_request(request):
    if request.method == 'POST':
        loaded_data = json.loads(request.body.decode('utf-8'))  # JSON-Daten in Python-Objekt umwandeln

        new_request = ContactRequest(
            reason = loaded_data['reason'],
            how_to_contact = loaded_data['how_to_contact'],
            first_name = loaded_data['first_name'],
            last_name = loaded_data['last_name'],
            email_phone = loaded_data['email/phone'],
            content = loaded_data['content']
        )

        new_request.save()

        return JsonResponse({'message' : 'Daten erfolgreich übermittelt'}, status=200)
    else:
        return JsonResponse({'message' : 'Ungültige Anfrage'}, status=400)
    
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  # Benutzer erstellen
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)  # Anmelden des Benutzers nach der Erstellung
            return redirect('home')  # Hier können Sie zur Startseite oder einer anderen Seite weiterleiten
    else:
        form = UserCreationForm()
    return render(request, 'sites/register.html', {'form': form})

