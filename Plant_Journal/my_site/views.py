from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'sites/home.html')

def diary(request):
    return render(request, 'sites/diary.html')

def contact(request):
    return render(request, 'sites/contact.html')

def ranking(request):
    return render(request, 'sites/ranking.html')