from django.contrib import admin
from .models import Authors, User

# Register your models here.
admin.site.register(User)
admin.site.register(Authors)
