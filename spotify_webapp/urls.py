# spotify_webapp/urls.py
from django.urls import path
from spotify_webapp import views  # Changed to absolute import

app_name = 'spotify_webapp'

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('callback/', views.callback, name='callback'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('top-tracks/', views.get_top_tracks, name='top-tracks'),
    path('refresh-token/', views.refresh_token, name='refresh-token'),
]