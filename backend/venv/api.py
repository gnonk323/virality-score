from flask import Flask, request, jsonify
from flask_cors import CORS
from spotify import find_songs, get_song, find_songs_from_csv

app = Flask(__name__)
CORS(app)

# Route to call spotify API to get requested song
@app.route("/api/search-songs", methods=['GET'])
def search_songs():
    query = request.args.get('query')
    artist = request.args.get('artist')
    num_songs = request.args.get('num_songs', type=int)

    if not query and not artist:
        return jsonify({"error": "You must provide at least a 'query' or 'artist' parameter."})
    
    songs = find_songs(query=query, artist=artist, num_songs=num_songs)
    return jsonify(songs)

@app.route("/api/get-song-info", methods=['GET'])
def get_song_info():
    song_id = request.args.get('song_id')
    return jsonify(get_song(song_id))

@app.route("/api/test", methods=['GET'])
def test():
    return {"message": "Hello, World!"}

@app.route("/api/search-songs-csv", methods=['GET'])
def search_songs_csv():
    song_name = request.args.get('song_name')
    artist = request.args.get('artist')
    num_songs = request.args.get('num_songs', type=int)

    return jsonify(find_songs_from_csv(song_name=song_name, artist=artist, num_songs=num_songs))

# Route to run the model on the given parameters
# @app.route("/api/calculate-virality", methods=['POST'])
# def return_virality():
#     return calculate_virality(request.get_json(["song_info"]))

if __name__ == "__main__":
    app.run(debug=True)