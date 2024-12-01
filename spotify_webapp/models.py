from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    spotify_access_token = models.CharField(max_length=255, blank=True)

    top_tracks = models.TextField(blank=True)   #will act as the info currently being displayed
    top_artists = models.TextField(blank=True)
    guest_top_tracks = models.TextField(blank=True)  # will act as the info currently being displayed
    guest_top_artists = models.TextField(blank=True)

    def __str__(self):
        return self.username

    @property
    def wraps(self):
        """Fetch all wraps for the user."""
        return self.spotify_wraps.all()


class SpotifyWrap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='spotify_wraps')
    top_tracks = models.TextField(blank=True)
    top_artists = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Spotify Wrap ({self.created_at}) for {self.user.username}"

class DuoWrap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='duo_wraps')
    user_top_tracks = models.TextField(blank=True)
    user_top_artists = models.TextField(blank=True)
    guest_top_tracks = models.TextField(blank=True)
    guest_top_artists = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Duo Wrap ({self.created_at}) for {self.user.username}"

# BUFFER FIELD FOR JANK ASS CODE USED IN SET_SESSION
class TopTrack(models.Model):
    top_tracks = models.TextField(blank=True)

class TopArtist(models.Model):
    top_artists = models.TextField(blank=True)

class AccessToken(models.Model): # can be used to access spotipy
    access_token = models.TextField(blank=True)

# END OF JANK ASS BUFFER FIELDS

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




