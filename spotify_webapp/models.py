from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Additional fields for Spotify-like functionality
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    # Spotify-specific fields
    spotify_id = models.CharField(max_length=100, blank=True)
    spotify_access_token = models.CharField(max_length=255, blank=True)
    spotify_refresh_token = models.CharField(max_length=255, blank=True)

    preferred_genres = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.username


class Track(models.Model):
