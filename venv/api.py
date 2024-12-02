from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/calculate-virality", methods=['POST'])
def return_virality():
    return calculate_virality(request.get_json(["spotifyInfo"]))