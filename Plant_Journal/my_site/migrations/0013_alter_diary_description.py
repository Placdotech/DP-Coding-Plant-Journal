# Generated by Django 4.2.5 on 2023-09-21 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("my_site", "0012_diary_files_alter_diaryfile_diary"),
    ]

    operations = [
        migrations.AlterField(
            model_name="diary",
            name="description",
            field=models.TextField(max_length=1000),
        ),
    ]
