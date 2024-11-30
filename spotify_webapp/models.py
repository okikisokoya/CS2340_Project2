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
    expiration_time = models.IntegerField(default=0)

    top_tracks = models.TextField(blank=True)
    top_artists = models.TextField(blank=True)
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

class Authors(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    major = models.CharField(max_length=50)
    favorite_char = models.CharField(max_length=50)
    bio = models.TextField(blank = True, null = True)
    email = models.EmailField(blank = True, null = True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Feedback(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(blank = True, null = True)
    feedback = models.TextField(blank = True, null = True)
    submitted_date = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.name} - {self.submitted_date}"

class TopTrack(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    track_id = models.CharField(max_length=100)
    name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    popularity = models.IntegerField()
    album_image_url = models.URLField(blank = True, null = True)

class TopArtist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    artist_id = models.CharField(max_length=100)
    name = models.CharField(max_length=255)
    popularity = models.IntegerField()
    artist_image_url = models.URLField(blank = True, null = True)


