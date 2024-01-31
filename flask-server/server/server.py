from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from PIL import Image
from io import BytesIO

model = pickle.load(open('./model.pk1', 'rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/predict", methods=["POST"])
def predict():
    # Get image data from request
    img_data = request.files['image']
    img = Image.open(img_data)
    
    # Preprocess the image (resize, convert to array, etc.)
    # Example:
    img_array = np.array(img.resize((224, 224)))  # Resize to match model input shape
    img_array = img_array / 255.0  # Normalize pixel values
    
    # Make prediction
    prediction = model.predict(np.array([img_array]))
    
    # Assuming your model predicts probabilities for each class
    # You can customize this part based on your model's output
    class_names = ['Class 1', 'Class 2']  # Example class names
    predicted_class = class_names[np.argmax(prediction)]
    
    # Return prediction result
    return jsonify({"prediction": predicted_class})

if __name__ == "__main__":
    app.run(debug=True)
