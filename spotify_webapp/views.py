# spotify_webapp/views.py
import json

from django.contrib.auth.forms import UserCreationForm
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.db.models.fields import return_None
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
from spotipy import SpotifyOAuth, Spotify

from wrapped.src.loginrequest import auth_URL
from .models import User, Authors, Feedback, TopArtist, TopTrack
from django.http import JsonResponse

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_protect, csrf_exempt

from CS2340_Project2.secret import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, 'Logged in successfully!')
            return JsonResponse({}, status=200)
        else:
            messages.error(request, 'Invalid username or password')

    return JsonResponse({"error": "Failed Authorization"})

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
    return JsonResponse({'auth_url': auth_url})


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
            sp = spotipy.Spotify(auth=token_info['access_token'])
            top_tracks_data = sp.current_user_top_tracks(limit=5, offset=0, time_range='medium_term')
            tracks = [item['name'] for item in top_tracks_data['items']]
            top_artists = sp.current_user_top_artists(limit=5, offset=0, time_range='medium_term')
            artists = [item['name'] for item in top_artists['items']]

            TopTrack.objects.create(top_tracks=', '.join(tracks))
            TopArtist.objects.create(top_artists=', '.join(artists))

            return redirect('http://localhost:4200/dashboard/')

    return JsonResponse({"error": "Failed Authorization"})

@csrf_exempt
def set_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            if len(user.top_tracks) == 0:
                user.top_tracks = TopTrack.objects.last().top_tracks
            if len(user.top_artists) == 0:
                user.top_artists = TopArtist.objects.last().top_artists
            user.save()
            TopTrack.objects.all().delete()
            TopArtist.objects.all().delete()
            messages.success(request, 'Logged in successfully!')
            return JsonResponse({}, status=200)
        else:
            messages.error(request, 'Invalid username or password')

    return JsonResponse({"error": "Failed Authorization"})

@csrf_exempt
def user_top_tracks(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
    try:
        return JsonResponse({
            'tracks': request.user.top_tracks,
        })
    except Exception as e:
        return JsonResponse({"error": str(e)})

@csrf_exempt
def user_top_artists(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
    try:
        return JsonResponse({
            'artists': request.user.top_artists,
        })
    except Exception as e:
        return JsonResponse({"error": str(e)})

def get_top_tracks(request):
    sp_oauth = SpotifyOAuth(
        client_id= SPOTIFY_CLIENT_ID,
        client_secret= SPOTIFY_CLIENT_SECRET,
        redirect_uri= "http://127.0.0.1:8000/top-tracks/",
        scope = 'user-top-read'
        # scope=settings.SPOTIFY_SCOPES,
    )
    if not request.GET.get("code"):
        auth_URL = sp_oauth.get_authorize_url()
        return redirect(auth_URL)
    token_info = sp_oauth.get_access_token(request.GET["code"], check_cache=False)
    sp = spotipy.Spotify(auth=token_info['access_token'])
    top_tracks_data = sp.current_user_top_tracks(limit=5, offset=0,time_range='medium_term')

    #printing
    print("\n==User's Top Tracks===")
    print("--------")
    #deleting the existing top tracks in case things need to start over
    TopTrack.objects.filter(user = request.user).delete()
    tracks_list=[];
    for idx, track in enumerate(top_tracks_data['items'], 1):
        album_cover_url = None
        if track['album'].get('images'):
            album_cover_url = track['album']['images'][0]['url']
        top_track = TopTrack.objects.create(
            user = request.user,
            track_id = track['id'],
            name = track['name'],
            artist = track['artists'][0]['name'],
            popularity = track['popularity'],
            album_image_url = album_cover_url,
        )
        track_name = track['name']
        artist_name = track['artists'][0]['name']
        album_cover_url = track['album']['images'][0]['url']
        print(f"{idx}.{track_name} by {artist_name}")
        preview_url = track.get('preview_url')

        track_info = f"{idx}.{track_name} by {artist_name}"
        if preview_url:
            track_info += f'<br><audio controls><source src="{preview_url}" type="audio/mpeg"></audio>'
        tracks_list.append(track_info)
        dbtrack_info = {
            'id': track['id'],
            'name': track['name'],
            'artist': track['artists'][0]['name'],
            'popularity': track['popularity'],
            'album_image_url': album_cover_url,
        }
        tracks_list.append(dbtrack_info)
    print("--------\n")
    return JsonResponse({
        'total-tracks': len(tracks_list),
        'tracks': tracks_list,
    })

def play_track_preview(request, track_id):
    if not request.GET.get("code"):
        return JsonResponse({"error": "Not authenticated"})

    sp_oauth = SpotifyOAuth(
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET,
        redirect_uri="http://127.0.0.1:8000/top-tracks/",
        scope='user-top-read'
    )

    token_info = sp_oauth.get_access_token(request.GET["code"], check_cache=False)
    sp = spotipy.Spotify(auth=token_info['access_token'])

    try:
        track = sp.track(track_id)
        preview_url = track['preview_url']

        if not preview_url:
            return JsonResponse({"error": "No preview available for this track"})

        return JsonResponse({
            "preview_url": preview_url,
            "name": track['name'],
            "artist": track['artists'][0]['name']
        })
    except Exception as e:
        return JsonResponse({"error": str(e)})
@csrf_exempt
def get_top_artists(request):
    sp_oauth = SpotifyOAuth(
        client_id= SPOTIFY_CLIENT_ID,
        client_secret= SPOTIFY_CLIENT_SECRET,
        redirect_uri= "http://127.0.0.1:8000/top-artists/",
        scope = 'user-top-read'
        # scope=settings.SPOTIFY_SCOPES,
    )
    if not request.GET.get("code"):
        auth_URL = sp_oauth.get_authorize_url()
        return redirect(auth_URL)
    token_info = sp_oauth.get_access_token(request.GET["code"], check_cache=False)
    sp = spotipy.Spotify(auth=token_info['access_token'])
    top_artists = sp.current_user_top_artists(limit=5, offset=0,time_range='medium_term')
    #printing
    print("\n==User's Top Tracks===")
    print("--------")
    TopArtist.objects.filter(user = request.user).delete()
    artists_list=[];
    for idx, artist in enumerate(top_artists['items'], 1):
        artist_image_url = artist['images'][0]['url'] if artist['images'] else None

        # creating and saving the top artists_list
        top_artist = TopArtist.objects.create(
            user = request.user,
            artist_id = artist['id'],
            name = artist['name'],
            popularity = artist['popularity'],
            artist_image_url = artist_image_url,
        )
        artist_name = artist['name']
        # album_cover_url = track['album']['images'][0]['url']
        print(f"{idx}. {artist_name}")

        artists_list.append(f"{idx}.{artist_name}")
    print("--------\n")

    #HI SORRY THIS IS OLIVIA, modified this to return json
    #so angular can digest
    return JsonResponse({"top_artists": artists_list})
    #return HttpResponse("<br>".join(artists_list))

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

@csrf_exempt
def signup_view(request):
    print("Request method:", request.method)
    print("Content type:", request.content_type)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received data:", data)
            
            if request.content_type == 'application/json':
                username = data.get('username')
                email = data.get('email')
                password = data.get('password')
                confirm_password = data.get('confirm_password')
            else:
                username = request.POST.get('username')
                email = request.POST.get('email')
                password = request.POST.get('password')
                confirm_password = request.POST.get('confirm_password')

            if not all([username, email, password, confirm_password]):
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            if password != confirm_password:
                return JsonResponse({'error': 'Passwords do not match.'}, status=400)
           
            # Check if the username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists.'}, status=400)

            # Check if the email already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Email already exists.'}, status=400)

            # Create user
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            login(request, user)

            response_data = {
                'message': 'Account created successfully!',
                'spotify_redirect_url': "https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=user-library-read"
            }

            return JsonResponse(response_data, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
        except Exception as e:
            print("Unexpected error:", str(e))
            return JsonResponse({'error': 'Something went wrong.'}, status=500)

    return render(request, 'spotify_webapp/signup.html')

def username_check(request):
    username = request.GET.get('username', '')
    if username and User.objects.filter(username=username).exists():
        return JsonResponse({'exists': True})
    return JsonResponse({'exists': False})


@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username_or_email = data.get('username_or_email', '').strip()
            new_password = data.get('new_password', '').strip()

            # Validate input
            if not username_or_email or not new_password:
                return JsonResponse({'error': 'Username/Email and new password are required.'}, status=400)

            # Retrieve the user
            user = User.objects.filter(username=username_or_email).first() or \
                   User.objects.filter(email=username_or_email).first()

            if not user:
                return JsonResponse({'error': 'User not found.'}, status=404)

            # Update the password
            user.set_password(new_password)
            user.save()

            return JsonResponse({'message': 'Password reset successfully.'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)

    return JsonResponse({'error': 'Invalid request method. Use POST.'}, status=405)



@login_required
def user_logout(request):
    logout(request)
    messages.success(request, 'Logged out successfully!')
    return redirect('spotify_webapp:home')

@csrf_exempt
def delete_account(request):
    user = request.user  # This is returning AnonymousUser since there's no authentication
    try:
        # Get the data from the request
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        # Find the user by username instead of relying on request.user
        user_to_delete = User.objects.get(username=username)
        
        # Verify password matches
        if user_to_delete.check_password(password):
            user_to_delete.delete()
            return JsonResponse({'message': 'Account deleted successfully'})
        else:
            return JsonResponse({'error': 'Invalid password'}, status=400)
            
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

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

def authors(request):
    authors = Authors.objects.all().order_by('last_name')
    return render(request, '/meet_the_authors.html', {'authors': authors})

def submit_feedback(request):
    if request.method == 'POST':
        Feedback.objects.create(
            name = request.POST.get('name'),
            email = request.POST.get('email'),
            feedback = request.POST.get('feedback'),
        )
        return redirect('spotify_webapp:home')
    return render(request, 'feedback_form.html')


# Add to views.py
@login_required
def test_game_stats(request):
    """Test view to check user's diversity and popularity scores"""
    print("\n=== Starting test_game_stats function ===")
    try:
        # Get user's top tracks
        user_tracks = TopTrack.objects.filter(user=request.user)
        print(f"Found {len(user_tracks)} tracks for user {request.user.username}")

        # Calculate unique artists
        unique_artists = set(track.artist for track in user_tracks)
        print(f"Unique artists: {unique_artists}")

        # Calculate average popularity
        total_popularity = sum(track.popularity for track in user_tracks)
        avg_popularity = total_popularity / len(user_tracks) if user_tracks else 0
        print(f"Total popularity: {total_popularity}")
        print(f"Average popularity: {avg_popularity}")

        # Print individual track details
        print("\nTrack details:")
        for track in user_tracks:
            print(f"Track: {track.name}")
            print(f"Artist: {track.artist}")
            print(f"Popularity: {track.popularity}")
            print("---")

        response_data = {
            'username': request.user.username,
            'tracks_data': [
                {
                    'name': track.name,
                    'artist': track.artist,
                    'popularity': track.popularity
                } for track in user_tracks
            ],
            'stats': {
                'total_tracks': len(user_tracks),
                'unique_artists': len(unique_artists),
                'unique_artist_names': list(unique_artists),
                'average_popularity': avg_popularity,
                'popularity_scores': [track.popularity for track in user_tracks]
            }
        }
        print("\nFinal response data:", response_data)
        return JsonResponse(response_data)

    except Exception as e:
        print(f"\nError occurred: {str(e)}")
        return JsonResponse({'error': str(e)})


# views.py
# views.py
@login_required
def find_user_to_compare(request):
    print("\n=== Finding User to Compare ===")
    if request.method == 'POST':
        username = request.POST.get('username')
        print(f"Looking for user: {username}")
        try:
            other_user = User.objects.get(username=username)
            print(f"Found user: {other_user.username}")

            # Check for Spotify data
            tracks = TopTrack.objects.filter(user=other_user)
            if not tracks.exists():
                messages.error(request, f"{username} needs to connect Spotify first")
                return render(request, 'spotify_webapp/find_user.html')

            print(f"Found {len(tracks)} tracks for comparison")
            return redirect('spotify_webapp:compare-with-user', user_id=other_user.id)

        except User.DoesNotExist:
            print(f"User not found: {username}")
            messages.error(request, f"User {username} not found")
            return render(request, 'spotify_webapp/find_user.html')

    return render(request, 'spotify_webapp/find_user.html')

@login_required
def compare_with_user(request, user_id):
    print("\n=== Comparing Users ===")
    try:
        other_user = User.objects.get(id=user_id)
        print(f"Comparing {request.user.username} with {other_user.username}")

        # Get tracks for both users
        user_tracks = TopTrack.objects.filter(user=request.user)
        other_tracks = TopTrack.objects.filter(user=other_user)

        if not user_tracks:
            print("Current user has no Spotify data")
            return JsonResponse({
                'error': 'Please connect your Spotify account first'
            })

        if not other_tracks:
            print(f"User {other_user.username} has no Spotify data")
            return JsonResponse({
                'error': f'{other_user.username} needs to connect their Spotify account first'
            })

        # Calculate metrics
        user_artists = set(track.artist for track in user_tracks)
        other_artists = set(track.artist for track in other_tracks)

        user_popularity = sum(track.popularity for track in user_tracks) / len(user_tracks)
        other_popularity = sum(track.popularity for track in other_tracks) / len(other_tracks)

        print(f"\nUser data:")
        print(f"{request.user.username}: {len(user_artists)} artists, {user_popularity:.2f} popularity")
        print(f"{other_user.username}: {len(other_artists)} artists, {other_popularity:.2f} popularity")

        # Calculate points
        user_points = 0
        other_points = 0

        # Artist diversity round
        if len(user_artists) > len(other_artists):
            user_points += 1
            artist_winner = request.user.username
        elif len(other_artists) > len(user_artists):
            other_points += 1
            artist_winner = other_user.username
        else:
            user_points += 1
            other_points += 1
            artist_winner = 'tie'

        # Popularity round
        if user_popularity > other_popularity:
            user_points += 1
            popularity_winner = request.user.username
        elif other_popularity > user_popularity:
            other_points += 1
            popularity_winner = other_user.username
        else:
            user_points += 1
            other_points += 1
            popularity_winner = 'tie'

        return JsonResponse({
            'comparison': {
                request.user.username: {
                    'unique_artists': len(user_artists),
                    'avg_popularity': user_popularity,
                    'points': user_points
                },
                other_user.username: {
                    'unique_artists': len(other_artists),
                    'avg_popularity': other_popularity,
                    'points': other_points
                }
            },
            'rounds': {
                'artist_diversity': {
                    'winner': artist_winner
                },
                'popularity': {
                    'winner': popularity_winner
                }
            }
        })

    except User.DoesNotExist:
        print("User not found")
        return JsonResponse({'error': 'User not found'})
    except Exception as e:
        print(f"Error: {str(e)}")
        return JsonResponse({'error': str(e)})