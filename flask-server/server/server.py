from flask import Flask, Response
from flask_cors import CORS
import cv2
import math
import time
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

# Initialize the YOLO model
model = YOLO("yolo-Weights/yolov8n.pt")

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

# Global variable to track start time
start_time = None

# Camera initialization
camera = cv2.VideoCapture(0)

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
                    object_boxes.append((x1, y1, x2, y2,class_names[int(box[5])]))  # Store bounding box coordinates

                    org = [x1, y1]
                    font = cv2.FONT_HERSHEY_SIMPLEX
                    fontScale = 1
                    color = (255, 0, 0)
                    thickness = 2

                    cv2.putText(img, f"{class_names[int(box[5])]} {confidence:.2f}", org, font, fontScale, color, thickness)
                    

    return object_detected, object_boxes

def ObjDec():
    global start_time  # To modify the global variable inside the function
    
    while True:
        success, img = camera.read()
        results = model(img, stream=True)
        object_detected, object_boxes = draw_boxes(img, results, classNames, objects_to_detect)
        
        for box in object_boxes:
            for i in box:
                print(i)
            x1, y1, x2, y2, class_name = box
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

        # Check if an object has been detected for more than one second
        if object_detected:
            if start_time is None:
                start_time = time.time()
            elif time.time() - start_time >= 1:
                for box in object_boxes:
                    x1, y1, x2, y2, class_name = box
                    if class_name in objects_to_detect:
                        print(class_name)
                
                start_time = None
                user_input = input("Do you want to capture the object? (y/n): ")
                if user_input.lower() == 'y':
                    print("Photo taken!")
                    # Add your photo capture logic here
                    pass
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        # Encode the frame as JPEG
        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()

        # Yield the frame for video streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


@app.route('/video')
def video():
    return Response(ObjDec(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__=="__main__":
    app.run(port=8000, debug=True)
