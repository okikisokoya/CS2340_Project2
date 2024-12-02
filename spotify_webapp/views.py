# spotify_webapp/views.py
import json

from django.contrib.auth.forms import UserCreationForm
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
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

from .models import User, Authors, Feedback, TopArtist, TopTrack, AccessToken, SpotifyWrap, DuoWrap
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

    return JsonResponse({"error": "Failed Authorization"}, status=500)

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
            authtoken = token_info['access_token']
            AccessToken.objects.create(access_token=authtoken)
            return redirect('http://localhost:4200/loading/')

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
            if AccessToken.objects.last():
                user.spotify_access_token = AccessToken.objects.last().access_token
            user.save()
            AccessToken.objects.all().delete()
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

@csrf_exempt
def user_popularity(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
    try:
        return JsonResponse({
            'popularity': request.user.popularity,
            'guest_popularity': request.user.guest_popularity,
        })
    except Exception as e:
        return JsonResponse({"error": str(e)})

@csrf_exempt
def generate_wrapped(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            headers = {
                "Authorization": f"Bearer {user.spotify_access_token}"
            }

            # Get top tracks
            top_tracks_url = "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term"
            top_tracks_response = requests.get(top_tracks_url, headers=headers)
            top_tracks_data = top_tracks_response.json()
            tracks = [item['name'] for item in top_tracks_data.get('items', [])]

            # Get top artists
            top_artists_url = "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term"
            top_artists_response = requests.get(top_artists_url, headers=headers)
            top_artists_data = top_artists_response.json()
            artists = [item['name'] for item in top_artists_data.get('items', [])]

            SpotifyWrap.objects.create(
                user=user,
                top_tracks=', '.join(tracks),
                top_artists=', '.join(artists)
            )

            user.top_tracks = SpotifyWrap.objects.last().top_tracks
            user.top_artists = SpotifyWrap.objects.last().top_artists

            user.save()
            return JsonResponse({}, status=200)
        else:
            messages.error(request, 'Invalid username or password')

    return JsonResponse({"error": "Failed Authorization"})

@csrf_exempt
def get_wrapped(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            # Fetch both SpotifyWrap and DuoWrap
            wraps = SpotifyWrap.objects.filter(user=user)
            duowraps = DuoWrap.objects.filter(user=user)

            # Format wraps data
            wraps_data = [
                {
                    'top_tracks': wrap.top_tracks,
                    'top_artists': wrap.top_artists,
                    'created_at': wrap.created_at.isoformat(),
                    'type': 'spotify_wrap'  # Mark the type as 'spotify_wrap'
                } for wrap in wraps
            ]

            # Format duowraps data
            duowraps_data = [
                {
                    'user_top_tracks': duowrap.user_top_tracks,
                    'user_top_artists': duowrap.user_top_artists,
                    'guest_top_tracks': duowrap.guest_top_tracks,
                    'guest_top_artists': duowrap.guest_top_artists,
                    'popularity': duowrap.popularity,
                    'guest_popularity': duowrap.guest_popularity,
                    'created_at': duowrap.created_at.isoformat(),
                    'type': 'duo_wrap'  # Mark the type as 'duo_wrap'
                } for duowrap in duowraps
            ]

            # Combine both wraps and duowraps data
            all_wraps = wraps_data + duowraps_data

            return JsonResponse({'wraps': all_wraps}, status=200)
        else:
            messages.error(request, 'Invalid username or password')

    return JsonResponse({"error": "Failed Authorization"})


@csrf_exempt
def set_user_params(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            tracks = data.get('tracks')
            artists = data.get('artists')
            popularity = data.get('popularity', None)
            guest_popularity = data.get('guestPopularity', None)
            guest_tracks = data.get('guestTracks', None)  # Default to None if not provided
            guest_artists = data.get('guestArtists', None)  # Default to None if not provided

            # Set user parameters
            user.top_tracks = tracks
            user.top_artists = artists
            user.popularity = popularity if popularity is not None else 0
            user.guest_popularity = guest_popularity if guest_popularity is not None else 0
            user.guest_top_tracks = guest_tracks if guest_tracks is not None else ''
            user.guest_top_artists = guest_artists if guest_artists is not None else ''

            user.save()  # Save user data

            return JsonResponse({}, status=200)
        else:
            messages.error(request, 'Invalid username or password')

    return JsonResponse({"error": "Failed Authorization"})


@csrf_exempt
def generate_duo_wrapped(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        guestusername = data.get('guestuser')
        guestpassword = data.get('guestpass')
        user = authenticate(request, username=username, password=password)
        guestuser = authenticate(request, username=guestusername, password=guestpassword)

        if user and guestuser is not None:

            login(request, guestuser)

            headers = {
                "Authorization": f"Bearer {guestuser.spotify_access_token}"
            }

            # Get top tracks
            top_tracks_url = "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term"
            top_tracks_response = requests.get(top_tracks_url, headers=headers)
            top_tracks_data = top_tracks_response.json()
            guesttracks = [item['name'] for item in top_tracks_data.get('items', [])]
            guestpopularity = sum(item['popularity'] for item in top_tracks_data.get('items', []))

            # Get top artists
            top_artists_url = "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term"
            top_artists_response = requests.get(top_artists_url, headers=headers)
            top_artists_data = top_artists_response.json()
            guestartists = [item['name'] for item in top_artists_data.get('items', [])]

            login(request, user)

            headers = {
                "Authorization": f"Bearer {user.spotify_access_token}"
            }

            # Get top tracks
            top_tracks_url = "https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term"
            top_tracks_response = requests.get(top_tracks_url, headers=headers)
            top_tracks_data = top_tracks_response.json()
            tracks = [item['name'] for item in top_tracks_data.get('items', [])]
            popularity = sum(item['popularity'] for item in top_tracks_data.get('items', []))

            # Get top artists
            top_artists_url = "https://api.spotify.com/v1/me/top/artists?limit=5&time_range=medium_term"
            top_artists_response = requests.get(top_artists_url, headers=headers)
            top_artists_data = top_artists_response.json()
            artists = [item['name'] for item in top_artists_data.get('items', [])]

            DuoWrap.objects.create(
                user=user,
                user_top_tracks=', '.join(tracks),
                user_top_artists=', '.join(artists),
                guest_top_tracks=', '.join(guesttracks),
                guest_top_artists=', '.join(guestartists),
                popularity=popularity,
                guest_popularity=guestpopularity,
            )

            user.top_tracks = DuoWrap.objects.last().user_top_tracks
            user.top_artists = DuoWrap.objects.last().user_top_artists
            user.guest_top_tracks = DuoWrap.objects.last().guest_top_tracks
            user.guest_top_artists = DuoWrap.objects.last().guest_top_artists
            user.popularity = DuoWrap.objects.last().popularity
            user.guest_popularity = DuoWrap.objects.last().guest_popularity

            user.save()
            return JsonResponse({}, status=200)
        else:
            messages.error(request, 'Invalid username or password')

    return JsonResponse({"error": "Failed Authorization"})

@csrf_exempt
def guest_top_tracks(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
    try:
        return JsonResponse({
            'tracks': request.user.guest_top_tracks,
        })
    except Exception as e:
        return JsonResponse({"error": str(e)})

@csrf_exempt
def guest_top_artists(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
    try:
        return JsonResponse({
            'artists': request.user.guest_top_artists,
        })
    except Exception as e:
        return JsonResponse({"error": str(e)})


from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from .models import SpotifyWrap, DuoWrap
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_datetime

@csrf_exempt
def delete_wrapped(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            wrap_type = data.get('type')  # Should be either 'spotify_wrap' or 'duo_wrap'
            created_at = data.get('created_at')  # Timestamp of the wrap to delete

            # Authenticate user
            user = authenticate(request, username=username, password=password)
            if user is None:
                return JsonResponse({"error": "Authentication failed"}, status=401)

            login(request, user)

            # Parse the creation time into a Python datetime object
            created_at_dt = parse_datetime(created_at)
            if created_at_dt is None:
                return JsonResponse({"error": "Invalid created_at format"}, status=400)

            # Delete the wrap based on its type
            if wrap_type == 'spotify_wrap':
                wrap = SpotifyWrap.objects.filter(user=user, created_at=created_at_dt).first()
            elif wrap_type == 'duo_wrap':
                wrap = DuoWrap.objects.filter(user=user, created_at=created_at_dt).first()
            else:
                return JsonResponse({"error": "Invalid wrap type"}, status=400)

            if wrap:
                wrap.delete()
                return JsonResponse({"message": "Wrap deleted successfully"}, status=200)
            else:
                return JsonResponse({"error": "Wrap not found"}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

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
@csrf_exempt
def submit_feedback(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        feedback = data.get('feedback')
        if not name or not email or not feedback:
            return JsonResponse({'error': 'Please fill all the fields'}, status=400)
        Feedback.objects.create(name=name, email= email, feedback=feedback)
        return JsonResponse({'message': 'Feedback submitted successfully!'}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)


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