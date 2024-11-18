from collections import Counter
from typing import Dict
import requests


class SpotifyGameSystem:
    def __init__(self):
        self.player_scores = {}

    def calculate_diversity_score(self, top_tracks: Dict) -> Dict[str, int]:
        if not top_tracks.get('items'):
            return {'genre_score': 0, 'artist_score': 0}

        genres = set()
        artists = set()

        for track in top_tracks['items']:
            for artist in track['artists']:
                artists.add(artist['id'])
                if 'genres' in artist:
                    genres.update(artist['genres'])

        return {
            'genre_score': len(genres),
            'artist_score': len(artists)
        }

    def compare_players(self, player1_data: Dict, player2_data: Dict) -> Dict:
        p1_scores = self.calculate_diversity_score(player1_data)
        p2_scores = self.calculate_diversity_score(player2_data)

        return {
            'genre_winner': 1 if p1_scores['genre_score'] > p2_scores['genre_score'] else 2,
            'artist_winner': 1 if p1_scores['artist_score'] > p2_scores['artist_score'] else 2,
            'player1_scores': p1_scores,
            'player2_scores': p2_scores
        }