import spotipy
from spotipy import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth

# Set up authentication
auth_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(auth_manager=auth_manager)


# Get the user's top tracks
top_tracks = sp.current_user_top_tracks(limit=10, offset = 0, time_range='medium_term') # Adjust limit as desired
#for loop for printing (yippee!)


# Print top tracks to terminal
print("Your Top Tracks:")
for idx, track in enumerate(top_tracks['items'], start=1):
    print(f"{idx}. {track['name']} by {', '.join(artist['name'] for artist in track['artists'])}")