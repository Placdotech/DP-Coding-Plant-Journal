from django.shortcuts import render
from django.http import JsonResponse
from .models import *
import json

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
