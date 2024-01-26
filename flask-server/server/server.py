from flask import Flask, jsonify
from flask_cors import CORS
import pickle
import numpy as np

model = pickle.load(open('iri.pkl', 'rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/members")
def members():
    return jsonify({"members": ["m1", "m2", "m3"]})

if __name__ == "__main__":
    app.run(debug=True)
