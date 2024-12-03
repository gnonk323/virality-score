from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Route to call spotify API to get requested song
@app.route("/api/find-songs", methods=['POST'])
def return_songs():
    return find_songs(request.get_json(["song_request"]))

# Route to run the model on the given parameters
@app.route("/api/calculate-virality", methods=['POST'])
def return_virality():
    return calculate_virality(request.get_json(["song_info"]))