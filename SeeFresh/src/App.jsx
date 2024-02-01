import './App.css';
import React, { useState, useRef } from 'react';
import CustomWebcam from './pages/inputPage/CustomWebcam';
import OutputPage from './pages/OutputPage/OutputPage';
import SetUpPage from './pages/SetUpPage/SetUpPage';
import IntroPage from './pages/IntroPage/IntroPage';

function App() {
    const webcamRef = useRef(null);
    const [capturedPrediction, setCapturedPrediction] = useState("intro");

    const capture = async () => {
        if (capturedPrediction === null) {
            await captureNull();
        } else if (capturedPrediction === "intro") {
            captureIntro();
        } else if (capturedPrediction === "setup") {
            caputureSetup();
        } else {
            capturePrediction();
        }
    };

    const captureNull = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const formData = new FormData();
        formData.append('image', dataURItoBlob(imageSrc));

        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        setCapturedPrediction(data.prediction);
    };

    const capturePrediction = () => {
        console.log({capturedPrediction})
        setCapturedPrediction(null);
    };

    const captureIntro = () => {
        setCapturedPrediction("setup");
    };

    const caputureSetup = () => {
        setCapturedPrediction(null);
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className='container' onClick={capture}>
            {capturedPrediction === null ? (
                <CustomWebcam webcamRef={webcamRef} />
            ) : capturedPrediction === "intro" ? (
                <IntroPage />
            ) : capturedPrediction === "setup" ? (
                <SetUpPage />
            ) : (
                <OutputPage prediction={capturedPrediction} />
                
            )}
        </div>
    );
}

export default App;
