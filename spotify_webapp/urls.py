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
    path('spotify-login/', views.spotify_login_view, name='spotify-login'),
    path('callback/', views.callback, name='callback'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('top-tracks/', views.get_top_tracks, name='top-tracks'),
    path('refresh-token/', views.refresh_token, name='refresh-token'),

    #for game
    path('test-setup/', views.test_setup, name='test-setup'),
    path('game-match/', views.game_match, name='game-match'),
    path('send-invitation/', views.send_invitation, name='send_invitation'),
    path('invitations/', views.view_invitations, name='view_invitations'),
    path('handle-invitation/<int:invitation_id>/', views.handle_invitation, name='handle_invitation'),
    path('game/<int:invitation_id>/', views.game_match, name='game-match'),
]