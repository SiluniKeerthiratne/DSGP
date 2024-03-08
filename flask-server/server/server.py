import cv2
import math
import time
from ultralytics import YOLO
import numpy as np
import pickle
from flask import Flask, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize models
model = YOLO("yolo-Weights/yolov8n.pt")
modelOne = pickle.load(open('./model.pk1', 'rb'))
detected_object = {}  # declare detected_object as global and initialize it as a dictionary

# Object classes
classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
              "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
              "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
              "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
              "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
              "fork", "knife", "spoon", "bowl", "banana", "apple", "potato", "tomato", "mango", "sandwich", "orange", "broccoli",
              "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
              "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
              "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
              "teddy bear", "hair drier", "toothbrush"
              ]

# Objects to detect
objects_to_detect = ["apple", "banana", "mango", "potato", "tomato"]

# Camera initialization


# Global variables
start_time = None
img_array = None

def draw_boxes(img, results, class_names, objects_to_detect, confidence_threshold=0.5):
    object_detected = False
    object_boxes = []  # Store bounding box coordinates of detected objects

    for r in results:
        boxes = r.boxes.data

        for box in boxes:
            x1, y1, x2, y2 = map(int, box[:4])  # Extracting the first 4 elements
            confidence = math.ceil((box[4] * 100)) / 100

            # Check if the detected class index is within the range of class_names
            if int(box[5]) < len(class_names):
                
                # Check if the detected object is in the objects_to_detect list
                if confidence > confidence_threshold and class_names[int(box[5])] in objects_to_detect:
                    object_detected = True
                    cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)
                    object_boxes.append((x1, y1, x2, y2, class_names[int(box[5])]))  # Store bounding box coordinates

                    org = [x1, y1]
                    font = cv2.FONT_HERSHEY_SIMPLEX
                    fontScale = 1
                    color = (255, 0, 0)
                    thickness = 2

                    cv2.putText(img, f"{class_names[int(box[5])]} {confidence:.2f}", org, font, fontScale, color, thickness)
                    

    return object_detected, object_boxes

def ObjDec():
    camera = cv2.VideoCapture(0)
    global detected_object
    global start_time
    global img_array
    
    detected_object = {}
    start_time = time.time()
    img_array = []

    while True:
        success, img = camera.read()
        results = model(img, stream=True)
        object_detected, object_boxes = draw_boxes(img, results, classNames, objects_to_detect)

        for box in object_boxes:
            x1, y1, x2, y2, class_name = box
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

            # Check if the detected object is in the objects_to_detect list
            if object_detected:
                if start_time is None:
                    start_time = time.time()
                elif time.time() - start_time >= 5:
                    print(class_name, "yomama")
                    detected_object = {"class_name": class_name, "box": [x1, y1, x2, y2]}
                   
                    # Crop the object from the original image
                    cropped_object = img[y1:y2, x1:x2]
                    
                    # Resize the image to match model input shape
                    resized_object = cv2.resize(cropped_object, (224, 224))
    
                    # Convert the image to array and normalize pixel values
                    img_array = np.array(resized_object) / 255.0
                    camera.release()
                    
                    # Now you have img_array ready for your model inference
                break  # Break the loop if an object is detected            
        if detected_object:
            print("here")
            
            
            break

        # Encode the frame as JPEG
        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()

        # If an object is detected, yield it
        yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video')
def video():
    return Response(ObjDec(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/getDetection')
def getDetection():
    global detected_object  # declare detected_object as global

    if detected_object and detected_object.get("class_name"):
        print(detected_object["class_name"], "2222")
        class_name = detected_object["class_name"]
        detected_object = {} # Reset detected_object
        
        return jsonify({"isObjectDetected": True, "objectClass": class_name})
    else:
        print("No object detected")
        return jsonify({"isObjectDetected": False})
    
@app.route('/getPredictionOne')
def getPredictionOne():
    global img_array
    
    if img_array is not None:
        prediction = modelOne.predict(np.array([img_array]))
        class_names = ['Class 1', 'Class 2']  
        predicted_class = class_names[np.argmax(prediction)]
        
        return jsonify({"prediction": predicted_class})
    else:
        return jsonify({"error": "Image array is not available yet"})

if __name__ == "__main__":
    app.run(port=8000, debug=True)
