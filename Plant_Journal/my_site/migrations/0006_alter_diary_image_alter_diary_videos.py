# Generated by Django 4.2.5 on 2023-09-16 00:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("my_site", "0005_remove_diary_media_diary_image_diary_videos"),
    ]

    operations = [
        migrations.AlterField(
            model_name="diary",
            name="image",
            field=models.ImageField(upload_to="media/images/"),
        ),
        migrations.AlterField(
            model_name="diary",
            name="videos",
            field=models.FileField(upload_to="media/videos/"),
        ),
    ]
