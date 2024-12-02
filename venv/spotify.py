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