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
    path('set-session/', views.set_session, name='set_session'),
    path('api/logout/', views.user_logout, name='logout'),
    path('api/profile/', views.profile, name='profile'),
    path('api/delete-account/', views.delete_account, name='delete_account'),
    path('api/reset-password/', views.reset_password, name = 'reset_password'),
    path('api/username-check/', views.username_check, name='username_check'),

    #for spotify
    path('api/spotifyLogin/', views.spotify_login_view, name='login'),
    path('callback/', views.callback, name='callback'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('top-tracks/', views.user_top_tracks, name='top-tracks'),
    path('top-artists/', views.user_top_artists, name='top-artists'),
    path('refresh-token/', views.refresh_token, name='refresh-token'),
    path('track/<str:track_id>/preview/', views.play_track_preview, name='track-preview'),
    path('meet-the-jedis/', views.authors, name = 'meet-the-jedis'),

    path('test-stats/', views.test_game_stats, name='test-stats'),
    path('api/find-user/', views.find_user_to_compare, name='find-user'),
    path('api/compare/<int:user_id>/', views.compare_with_user, name='compare-with-user'),

    path('generate-wrapped/', views.generate_wrapped, name="generate_wrapped"),
    path('get-wrapped/', views.get_wrapped, name="get_wrapped"),
    path('set-user-params/', views.set_user_params, name="set_user_params"),
]