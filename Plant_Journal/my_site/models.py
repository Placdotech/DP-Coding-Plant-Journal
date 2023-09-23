from django.db import models

# Create your models here.

class User(models.Model):
    
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, null=False, blank=False)
    first_name = models.CharField(max_length=40, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    hashed_password = models.CharField(max_length=128, null=False, blank=False)
    key = models.CharField(max_length=128, null=False, blank=False)

class Diary(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    created_at = models.DateField(auto_now_add=True)
    files = models.ManyToManyField('DiaryFile', related_name='diary_entries')

class DiaryFile(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, related_name='diary_files')
    images = models.ImageField(upload_to='media/images/')
    videos = models.FileField(upload_to='media/videos/')