from django.contrib import admin
from .models import Authors, User, TopTrack, TopArtist

# Register your models here.
admin.site.register(User)
admin.site.register(Authors)
admin.site.register(TopTrack)
admin.site.register(TopArtist)
