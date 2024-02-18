from flask import Flask, request, jsonify
import cv2
import numpy as np
from keras.models import load_model

app = Flask(__name__)

# Load the saved model
model = load_model('trained_model.h5')


# Function to preprocess the input image
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (244, 244))
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img


# Function to predict ripeness class
def predict_ripeness(image_path):
    preprocessed_img = preprocess_image(image_path)
    predictions = model.predict(preprocessed_img)
    predicted_class_index = np.argmax(predictions)
    return predicted_class_index


@app.route('/')
def index():
    return 'Welcome to Fruit Ripeness Prediction API!'


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # Save the uploaded image
        image_path = 'temp_image.jpg'
        file.save(image_path)

        # Predict ripeness class
        predicted_class_index = predict_ripeness(image_path)

        # Map the predicted class index to the ripeness class label
        ripeness_classes = ['Unripe', 'Partially Ripe', 'Ripe']
        predicted_ripeness_class = ripeness_classes[predicted_class_index]
        print(predicted_ripeness_class)

        # Return the prediction
        return jsonify({'predicted_ripeness_class': predicted_ripeness_class})


if __name__ == '__main__':
    app.run(debug=True)
