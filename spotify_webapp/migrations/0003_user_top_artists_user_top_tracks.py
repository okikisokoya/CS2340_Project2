# Generated by Django 5.1.3 on 2024-11-30 05:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "spotify_webapp",
            "0002_authors_feedback_user_expiration_time_topartist_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="top_artists",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="user",
            name="top_tracks",
            field=models.TextField(blank=True),
        ),
    ]