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
class Track(models.Model):
#Basic information
    album = models.TextField() #album on which track appears
    artist = models.TextField() #artists who performed on track
    available_markets = models.JSONField(default=list) #List of countries track can be played
    uri = models.TextField()
    disc_number = models.IntegerField()
    duration_ms = models.IntegerField()
    explicit = models.BooleanField()
    external_ids = models.JSONField(default=list)
    external_urls = models.JSONField(default=list)
    href = models.TextField()
    trackid = models.TextField()
    is_playable = models.BooleanField()
    linked_from = models.JSONField(default=list)
    restrictions = models.JSONField(default=list)
    name = models.TextField() #name of track
    popularity = models.IntegerField()
    preview_url = models.TextField() #can be nullable
    track_number = models.IntegerField()
    type = models.TextField()
    is_local = models.BooleanField()
#audio feature?

#Artist model (based off of Spotify WebAPI)
class Artist(models.Model):
    external_urls = models.TextField()
    followers = models.IntegerField()
    genres = models.JSONField(default=list)
    href = models.TextField()
    artistid = models.TextField()
    images = models.JSONField(default=list)
    name = models.TextField()
    popularity = models.IntegerField()
    type = models.TextField()
    uri = models.TextField()