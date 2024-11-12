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


#class Track(models.Model):
class SpotifyWrap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    top_tracks = models.JSONField(default=dict)
    top_artists = models.JSONField(default=dict)
    favorite_genres = models.JSONField(default=dict)
    total_listening_time = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username}'s Wrap - {self.created_at.strftime('%Y-%m-%d')}"
