# Generated by Django 4.2.5 on 2023-09-04 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ContactRequest",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "reason",
                    models.CharField(
                        choices=[
                            ("login", "Probleme beim login"),
                            ("register", "Probleme beim registrieren"),
                            ("improvement", "Verbesserungsvorschläge"),
                            ("problems", "Probleme mit der Website"),
                            ("others", "Sonstiges"),
                        ],
                        max_length=200,
                    ),
                ),
                (
                    "how_to_contact",
                    models.CharField(
                        choices=[
                            ("email", "Email"),
                            ("call", "Anrufen"),
                            ("WhatsApp", "WhatsApp"),
                        ],
                        max_length=200,
                    ),
                ),
                ("first_name", models.CharField(max_length=40)),
                ("last_name", models.CharField(max_length=40)),
                ("email_phone", models.CharField(max_length=100)),
                ("content", models.CharField(max_length=2000)),
                ("seen", models.BooleanField(default=False)),
                ("important", models.BooleanField(default=False)),
                ("in_process", models.BooleanField(default=False)),
                ("finished", models.BooleanField(default=False)),
            ],
        ),
    ]
