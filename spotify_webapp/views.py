# spotify_webapp/views.py
from django.shortcuts import render, redirect
import urllib
import requests
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from spotipy import SpotifyOAuth

from .models import User
from django.http import JsonResponse

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_protect

from CS2340_Project2.secret import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

def spotify_login_view(request):
    scope = 'user-read-private user-top-read'
    params = {
        'client_id': settings.SPOTIFY_CLIENT_ID,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
        'show_dialog': True
    }
    auth_url = f"https://accounts.spotify.com/authorize?{urllib.parse.urlencode(params)}"
    return redirect(auth_url)


def callback(request):
    if 'error' in request.GET:
        return JsonResponse({"error": request.GET['error']})

    if 'code' in request.GET:
        req_body = {
            'code': request.GET['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
            'client_id': settings.SPOTIFY_CLIENT_ID,
            'client_secret': settings.SPOTIFY_CLIENT_SECRET,
        }

        response = requests.post('https://accounts.spotify.com/api/token', data=req_body)
        token_info = response.json()

        if 'access_token' in token_info:
            request.session['access_token'] = token_info['access_token']
            request.session['refresh_token'] = token_info['refresh_token']
            request.session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']
            return redirect('spotify_webapp:top-tracks')

    return JsonResponse({"error": "Failed Authorization"})


def get_top_tracks(request):
    sp_oauth = SpotifyOAuth(
        client_id= SPOTIFY_CLIENT_ID,
        client_secret= SPOTIFY_CLIENT_SECRET,
        redirect_uri= settings.SPOTIFY_REDIRECT_URI,
        scope=settings.SPOTIFY_SCOPES,
    )
    if request.GET.get("code"):
        token_info = sp_oauth.get_access_token(request.GET["code"])
        sp = spotipy.Spotify(auth=token_info['access_token'])
    topTracks = sp.current_user_top_tracks(limit=5, offset=0,time_range='medium_term')
    #printing to terminal??
    top_tracks = []
    for idx, track in enumerate(topTracks['items']):
        track_name = track['name']
        artist_name = track['artists'][0]['name']
        top_tracks.append(f"{idx + 1}. {track_name} by {artist_name}")
        print(f"{idx + 1}. {track_name} by {artist_name}")

    return HttpResponse("<br>".join(top_tracks))

        #importing spotipy
    # if 'access_token' not in request.session:
    #     return redirect('spotify_webapp:login')
    #
    # headers = {
    #     'Authorization': f"Bearer {request.session['access_token']}"
    # }
    #
    # response = requests.get('https://api.spotify.com/v1/me/top/tracks', headers=headers)
    # return JsonResponse(response.json())


def refresh_token(request):
    if 'refresh_token' not in request.session:
        return redirect('spotify_webapp:login')

    req_body = {
        'grant_type': 'refresh_token',
        'refresh_token': request.session['refresh_token'],
        'client_id': settings.SPOTIFY_CLIENT_ID,
        'client_secret': settings.SPOTIFY_CLIENT_SECRET,
    }

    response = requests.post('https://accounts.spotify.com/api/token', data=req_body)
    new_token_info = response.json()

    if 'access_token' in new_token_info:
        request.session['access_token'] = new_token_info['access_token']
        request.session['expires_at'] = datetime.now().timestamp() + new_token_info['expires_in']
        return redirect('spotify_webapp:top-tracks')

    return JsonResponse({"error": "Failed to refresh token"})

def dashboard(request):
    if 'access_token' not in request.session:
        return redirect('spotify_webapp:login')
    return render(request, 'spotify_webapp/dashboard.html')


def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')

        if password != confirm_password:
            messages.error(request, 'Passwords do not match')
            return render(request, 'spotify_webapp/signup.html')

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return render(request, 'spotify_webapp/signup.html')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists')
            return render(request, 'spotify_webapp/signup.html')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        login(request, user)
        messages.success(request, 'Account created successfully!')
        return redirect('spotify_webapp:dashboard')

    return render(request, 'spotify_webapp/signup.html')


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, 'Logged in successfully!')
            return redirect('spotify_webapp:dashboard')
        else:
            messages.error(request, 'Invalid username or password')

    return render(request, 'spotify_webapp/login.html')


@login_required
def user_logout(request):
    logout(request)
    messages.success(request, 'Logged out successfully!')
    return redirect('spotify_webapp:home')


@login_required
def delete_account(request):
    if request.method == 'POST':
        password = request.POST.get('password')
        user = authenticate(request, username=request.user.username, password=password)

        if user is not None:
            user.delete()
            messages.success(request, 'Account deleted successfully')
            return redirect('spotify_webapp:home')
        else:
            messages.error(request, 'Invalid password')

    return render(request, 'spotify_webapp/delete_account.html')


@login_required
def profile(request):
    if request.method == 'POST':
        user = request.user
        user.email = request.POST.get('email', user.email)

        if 'profile_picture' in request.FILES:
            user.profile_picture = request.FILES['profile_picture']

        user.bio = request.POST.get('bio', user.bio)

        # Only update password if provided
        new_password = request.POST.get('new_password')
        if new_password:
            current_password = request.POST.get('current_password')
            if user.check_password(current_password):
                user.set_password(new_password)
                messages.success(request, 'Password updated successfully')
            else:
                messages.error(request, 'Current password is incorrect')
                return render(request, 'spotify_webapp/profile.html')

        user.save()
        messages.success(request, 'Profile updated successfully')

    return render(request, 'spotify_webapp/profile.html')


def home(request):
    return render(request, 'spotify_webapp/home.html')
