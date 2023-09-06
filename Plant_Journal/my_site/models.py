from django.db import models

# Create your models here.

class ContactRequest(models.Model):
    HOW_TO_CONTACT_CHOICES = [
        ('email', 'Email'),
        ('call', 'Anrufen'),
        ('WhatsApp', 'WhatsApp')
    ]
    
    REASON_CHOICES = [
        ('login', 'Probleme beim login'),
        ('register', 'Probleme beim registrieren'),
        ('improvement', 'Verbesserungsvorschläge'),
        ('problems', 'Probleme mit der Website'),
        ('others', 'Sonstiges')
    ]

    id = models.AutoField(primary_key=True)
    reason = models.CharField(max_length=200, choices=REASON_CHOICES)
    how_to_contact = models.CharField(max_length=200, choices=HOW_TO_CONTACT_CHOICES)
    first_name = models.CharField(max_length=40, null=False, blank=False)
    last_name = models.CharField(max_length=40, null=False, blank=False)
    email_phone = models.CharField(max_length=100, null=False, blank=False)
    content = models.CharField(max_length=2000, null=False, blank=False)
    seen = models.BooleanField(default=False)
    important = models.BooleanField(default=False)
    in_process = models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
