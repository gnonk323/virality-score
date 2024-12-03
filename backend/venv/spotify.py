import spotipy
from spotipy.oauth2 import SpotifyOAuth
from speech_module import speak_phrase
import creds

username = 'b9hex'
client_ID = creds.spotify_client_ID
client_secret = creds.spotify_client_secret
redirect_uri = 'http://google.com/callback/'
scope = "user-read-playback-state user-modify-playback-state playlist-modify-private playlist-modify-public"

device_id = creds.device_id

def find_songs(song, artist, num_songs):
    query = f"track:{song} artist:{artist}"
    results = spotifyObject.search(query, num_songs, 0, "track")
    songs_dict = results['tracks']
    song_items = songs_dict['items']
    if song_items:
       return song_items
    else:
        return None

# Code after if statement to get the song_name and artist of the first song
'''
song_name = song_items[0]['name']
artist = song_items[0]['artists'][0]['name']
return {
    'song_name': song_name,
    'artist': artist,
}
'''