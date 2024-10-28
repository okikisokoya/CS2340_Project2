# spotify_webapp/views.py
from django.shortcuts import render
import urllib
import requests
from django.http import JsonResponse
from django.shortcuts import redirect
from datetime import datetime, timedelta
from django.conf import settings


def login_view(request):
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
    if 'access_token' not in request.session:
        return redirect('spotify_webapp:login')

    headers = {
        'Authorization': f"Bearer {request.session['access_token']}"
    }

    response = requests.get('https://api.spotify.com/v1/me/top/tracks', headers=headers)
    return JsonResponse(response.json())


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
