# SeeFresh: A Vision for Freshness

Welcome to the SeeFresh repository! This project is a culmination of the efforts of our data science group during our 2nd year at university. SeeFresh is a mobile-responsive web application designed to assist visually impaired individuals in shopping more independently by utilizing image processing techniques to identify the freshness and ripeness status of fruits and vegetables.

## Project Overview

SeeFresh employs a custom convolutional neural network (CNN) for detecting rotten produce and a trained InceptionV3 model for determining the ripeness stage. The application is built using React for the frontend, Flask for the backend API, and incorporates touch navigation, audio outputs, and other accessibility features.

## Instructions

To get started with SeeFresh, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone -b siluni https://github.com/SiluniKeerthiratne/DSGP
   ```

2. **Download Models:**
   Download the required models from [the provided link](https://drive.google.com/drive/folders/1L5SjSJ9vpnjAuMBZ-OtN2WjrWEW9PeCH?usp=sharing) and place them in the `server` folder within the `flask-server` directory.

3. **Run Backend:**
   Navigate to the `flask-server` directory in your terminal:
   ```bash
   cd SeeFresh/flask-server
   ```
   Then, execute the following command to start the backend server:
   ```bash
   python3 server.py
   ```

4. **Run Frontend:**
   Go to the `SeeFresh` directory:
   ```bash
   cd ../SeeFresh
   ```
   Install dependencies:
   ```bash
   npm install
   ```
   Finally, run the frontend development server:
   ```bash
   npm run dev
   ```

Once both the backend and frontend servers are running, you can access SeeFresh by navigating to `http://localhost:5143` in your web browser.

## Contributors

- [Siluni Keerthiratne](mailto:siluni.20220641@iit.ac.lk)
- [Vanuja De Silva](mailto:vanuja.20220141@iit.ac.lk)
- [Nisak Gamage](mailto:nisal.20220359@iit.ac.lk)
- [Ganidu Perera](mailto:gaindu.20210777@iit.ac.lk)

Feel free to reach out to the contributors with any questions or feedback regarding the project.

Thank you for your interest in SeeFresh! We hope it provides a valuable tool for enhancing the independence of visually impaired individuals in their shopping experiences.
