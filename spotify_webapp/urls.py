# spotify_webapp/urls.py
from django.urls import path, re_path
from spotify_webapp import views  
from django.views.generic import TemplateView

app_name = 'spotify_webapp'

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    
    #our webapp
    path('api', views.home, name='home'),
    path('api/signup/', views.signup_view, name='signup'),
    path('api/login/', views.user_login, name='login'),
    path('api/logout/', views.user_logout, name='logout'),
    path('api/profile/', views.profile, name='profile'),
    path('api/delete-account/', views.delete_account, name='delete_account'),

    #for spotify
    path('api/spotifyLogin/', views.spotify_login_view, name='login'),
    path('callback/', views.callback, name='callback'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('top-tracks/', views.get_top_tracks, name='top-tracks'),
    path('top-artists/', views.get_top_artists, name='top-artists'),
    path('refresh-token/', views.refresh_token, name='refresh-token'),
    path('track/<str:track_id>/preview/', views.play_track_preview, name='track-preview'),
    path('meet-the-jedis/', views.authors, name = 'meet-the-jedis'),

]