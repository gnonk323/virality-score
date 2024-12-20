import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import creds
import pandas as pd

CLIENT_ID = creds.spotify_client_ID
CLIENT_SECRET = creds.spotify_client_secret

auth_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=auth_manager)

def find_songs_from_csv(song_name=None, artist=None, num_songs=5, csv_file="data/Spotify_Youtube.csv"):
    if not song_name and not artist:
        return {"error": "You must provide at least a 'song_name' or 'artist' parameter."}
    
    df = pd.read_csv(csv_file)

    min_loudness = df['Loudness'].min()
    max_loudness = df['Loudness'].max()

    df['Loudness'] = round((df['Loudness'] - min_loudness) / (max_loudness - min_loudness), 4)

    if song_name and artist:
        filtered_df = df[(df['Track'].str.contains(song_name, case=False, na=False)) &
                         (df['Artist'].str.contains(artist, case=False, na=False))]
    elif song_name:
        filtered_df = df[df['Track'].str.contains(song_name, case=False, na=False)]
    elif artist:
        filtered_df = df[df['Artist'].str.contains(artist, case=False, na=False)]

    top_songs = filtered_df.head(num_songs)

    songs_list = top_songs.to_dict(orient='records')

    return songs_list

def find_songs(query=None, artist=None, num_songs=5):
    """Fetch the top N songs from Spotify based on the search query or artist."""
    if not query and not artist:
        return {"error": "You must provide at least a 'query' or 'artist' parameter."}

    search_query = f"{query} {artist}" if artist else query
    results = sp.search(q=search_query, type='track', limit=num_songs)

    tracks = []
    for item in results['tracks']['items']:
        track_info = {
            'id': item['id'],
            'name': item['name'],
            'artist': ', '.join(artist['name'] for artist in item['artists']),
            'album': item['album']['name'],
            'duration_ms': item['duration_ms'],  # Duration in milliseconds
            'image': item['album']['images'][0]['url'] if item['album']['images'] else None,
            'url': item['external_urls']['spotify']
        }
        tracks.append(track_info)

    return tracks

def get_song(song_id):
    """Fetch the song features from Spotify based on the song ID."""
    song = sp.track(song_id)
    print(song)
    return song


if __name__ == "__main__":
    songs = find_songs_from_csv(artist="radiohead")
    print(songs)
