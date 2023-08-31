from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'sites/home.html')

def diary(request):
    return render(request, 'sites/diary.html')