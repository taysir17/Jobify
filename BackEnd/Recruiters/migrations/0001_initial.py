# Generated by Django 4.2 on 2024-10-20 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Recruiter",
            fields=[
                (
                    "Id",
                    models.AutoField(editable=False, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=255)),
                ("email", models.CharField(max_length=255)),
            ],
        ),
    ]
