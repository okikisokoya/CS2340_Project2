from django.contrib import admin
from .models import Authors, User, TopTrack, TopArtist, AccessToken, SpotifyWrap, DuoWrap

# Register your models here.
admin.site.register(User)
admin.site.register(Authors)
admin.site.register(TopTrack)
admin.site.register(TopArtist)
admin.site.register(AccessToken)
admin.site.register(SpotifyWrap)
admin.site.register(DuoWrap)
