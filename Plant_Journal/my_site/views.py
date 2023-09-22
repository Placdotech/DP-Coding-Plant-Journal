from django.http import HttpResponse
from django.http import Http404
from django.contrib.auth.hashers import make_password
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.contrib import messages
from django.db import connection
import secrets
from .models import *
import json

# Create your views here.

def start(request):
    if request.methode == 'GET':
        return redirect('home')
    else:
        raise Http404("Ungültige Anfrage")

def home(request):   
    if request.GET.get('new_user_reg') == '1':      #shows a new_reg_banner
        
        ctx = {
            'new_user_reg' : True
        }

    elif request.method == 'GET' and 'user_key' in request.COOKIES:

        user_key = request.COOKIES['user_key']

        try:
            user = User.objects.get(key=user_key)
        except:
            raise Http404("Ungültige Anfrage")

        ctx = {
            'new_user_reg' : False,
            'user_key' : user_key,
            'username' : user.username
        }

        return render(request, 'sites/home.html', ctx)
    
    elif request.method == 'GET':

        ctx = {
            'new_user_reg' : False,
            'user_key' : None        
        }

        return render(request, 'sites/home.html', ctx)

    else:
        raise Http404("Ungültige Anfrage")
    
def diary(request):
    if request.method == 'GET' and 'user_key' in request.COOKIES:

        try:
            user = User.objects.get(key=request.COOKIES.get('user_key'))
        except:
            raise Http404("Ungültige Anfrage")

        diaries = Diary.objects.filter(author_id=user.id).all()

        titles = []
        descriptions = []
        created_at = []
        authors = []

        images = []
        videos = []

        image_puffer = []
        videos_puffer = []

        media_objects = []

        entries = []

        for entry in diaries:
            
            titles.append(entry.title)
            descriptions.append(entry.description)
            created_at.append(entry.created_at)
            authors.append(user.username)

        for x in diaries:
            media_objects.append(DiaryFile.objects.filter(diary_id=x.id).all())

        for index, _ in enumerate(media_objects):
            x = (media_objects[index])
            image_puffer = []
            videos_puffer = []
            for y in x:
                if y.images != '':
                    image_puffer.append(y.images)
                if y.videos != '':
                    videos_puffer.append(y.videos)
            images.append(image_puffer)
            videos.append(videos_puffer)
        
        for i in range(0, len(titles)):

            entries.append(
                {
                'created_at_list' : created_at[i],
                'titles' : titles[i],
                'descriptions' : descriptions[i],
                'images' : images[i],
                'videos' : videos[i],
                'authors' : authors[i],                
                }
            )

        ctx = {
            'entries' : entries
        }

        return render(request, 'sites/diary.html', ctx)
        
    elif request.method == 'GET':
        return render(request, 'sites/diary.html')
    else:
        raise Http404("Ungültige Anfrage")

def create_entry(request):
    if 'user_key' in request.COOKIES and request.method == 'GET':

        try:
            user = User.objects.get(key=request.COOKIES.get('user_key'))
        except:
            raise Http404("Ungültige Anfrage")
                
        ctx = {
            'username' : user.username
        }

        return render(request, 'sites/create_entry.html', ctx)
    
    elif 'user_key' in request.COOKIES and request.method == 'POST':
        
        form_data = request.POST
        files = request.FILES

        try:
            current_user = User.objects.get(key=request.COOKIES.get('user_key'))
        except:
            raise Http404("Ungültige Anfrage")

        new_diary_data = Diary(      
            author = current_user,
            title = form_data['title'],
            description = form_data['description'],
            created_at = form_data['created_at']
        )

        new_diary_data.save()
        
        for image_file in files.getlist('image_upload'):
            DiaryFile.objects.create(diary=new_diary_data, images=image_file)

        for video_file in files.getlist('video_upload'):
            DiaryFile.objects.create(diary=new_diary_data, videos=video_file)

        return JsonResponse({'message' : 'Daten erfolgreich übermittelt'}, status=200)

    else:
        raise Http404("Ungültige Anfrage")

def contact(request):
    if request.method == 'GET':
        return render(request, 'sites/contact.html')
    else:
        raise Http404("Ungültige Anfrage")
    
def ranking(request):
    if request.method == 'GET':

        amount_of_entries = []
        user_informations = []
        author_ids = []
        usernames = []

        try:
            with connection.cursor() as cursor:
                cursor.execute('''
                    SELECT COUNT(author_id) AS count, author_id
                    FROM my_site_diary
                    GROUP BY author_id
                    ORDER BY count DESC
                ''')

                results = cursor.fetchall()
        except:
            raise Http404("Ungültige Anfrage")
           
        for count, author_id in results:
            amount_of_entries.append(count)
            author_ids.append(author_id)

        for author_id in author_ids:
            username = User.objects.get(id=author_id)
            usernames.append(username.username)

        for i in range(0, len(usernames)):

            user_informations.append({

                'amount_of_entries' : amount_of_entries[i],
                'usernames' : usernames[i]

            })
        
        ctx = {
            'ranklist' : user_informations 
        }

        return render(request, 'sites/ranking.html', ctx)

    else:
        raise Http404("Ungültige Anfrage")
    
def login(request):
    if request.method == 'POST':
        
        data = json.loads(request.body)

        form_data = {}
    
        for item in data:
            form_data[item['name']] = item['value']
        
        username = form_data['username']
        plain_password = form_data['password']
        
        if not User.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Benutzername oder Passwort falsch'})
        
        user = User.objects.get(username=username)

        if not check_password(plain_password, user.hashed_password):
            return JsonResponse({'message': 'Benutzername oder Passwort falsch'})
        
        return JsonResponse({'message': 'Login erfolgreich', 'data' : {'user_key' : user.key}})
    elif request.method == 'GET':
        photo_list = []
        for i in range(6):
            photo_list.append(f'pflanze_{i}.jpg')

        ctx = {
            'photo_number' : photo_list,
        }

        if request.method == 'GET' and request.GET.get('fail') == '1':

            messages.error(request, 'Benutzername oder Passwort falsch')

        return render(request, 'sites/login.html', ctx)
    else:
        raise Http404("Ungültige Anfrage")

def logout(request):
    if request.method == 'GET':
        return redirect('home')
    else:
        raise Http404("Ungültige Anfrage")

def signup(request):

    if request.method == 'POST':

        data = json.loads(request.body)

        form_data = {}
    
        for item in data:
            form_data[item['name']] = item['value']
        
        username = form_data['username']
        first_name = form_data['first_name']
        last_name = form_data['last_name']
        password = form_data['password']

        hashed_password = make_password(password)

        if not (username and first_name and last_name and password):
            raise Http404("Ungültige Anfrage")
        
        if User.objects.filter(username=username).exists():
            raise Http404("Ungültige Anfrage")
        
        key = secrets.token_bytes(16)
        
        new_user_data = {
            'username' : username,
            'first_name' : first_name,
            'last_name' : last_name,
            'hashed_password' : hashed_password,
            'key' : key
        }

        new_user = User(
            username = new_user_data['username'],
            first_name = new_user_data['first_name'],
            last_name = new_user_data['last_name'],
            hashed_password = new_user_data['hashed_password'],
            key = new_user_data['key']
        )

        new_user.save()

        return JsonResponse({'message' : 'success'}, status=201)

    elif request.method == 'GET':
        photo_list = []
        ctx = {}

        for i in range(6):
            photo_list.append(f'pflanze_{i}.jpg')

        ctx['photo_number'] = photo_list 
            
        return render(request, 'sites/signup.html', ctx,)
    else:
        raise Http404("Ungültige Anfrage")

def check_username(request):
    
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        is_available = not User.objects.filter(username=username).exists()
        data = {
            'is_available' : is_available
        }
        return JsonResponse(data)
    else:
        raise Http404("Ungültige Anfrage")

def impressum(request):
    if request.method == 'GET':
        return render(request, 'sites/impressum.html')
    else:
        raise Http404("Ungültige Anfrage")
    
def privacy_policy(request):
    if request.method == 'GET':
        return render(request, 'sites/privacy_policy.html')
    else:
        raise Http404("Ungültige Anfrage")
    