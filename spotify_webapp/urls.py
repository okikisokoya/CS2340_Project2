# spotify_webapp/urls.py
from django.urls import path
from spotify_webapp import views  # Changed to absolute import

app_name = 'spotify_webapp'

urlpatterns = [
    #our webapp
path('', views.home, name='home'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('profile/', views.profile, name='profile'),
    path('delete-account/', views.delete_account, name='delete_account'),

    #for spotify
    path('login/', views.spotify_login_view, name='login'),
    path('callback/', views.callback, name='callback'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('top-tracks/', views.get_top_tracks, name='top-tracks'),
    path('top-artists/', views.get_top_artists, name='top-artists'),
    path('refresh-token/', views.refresh_token, name='refresh-token'),
]