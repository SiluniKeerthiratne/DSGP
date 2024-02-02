import './App.css';
import React, { useState, useRef, useEffect } from 'react';
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
            captureIntro()
        } else if (capturedPrediction === "introPlay"){
            captureIntroPlay();
        } else if (capturedPrediction === "setup") {
            caputureSetup();
        } else if (capturedPrediction === "setupPlay"){
            caputureSetupPlay();
        } else {
            capturePrediction();
        }
    };

    const textInto = "Welcome to SeeFresh. Everything you need to know about your groceries just one click away!. Tap screen to continue"
    const textSetUp = "Tap once on the  the screen, we will indicate with a “beep” if an object is placed within the screen, then tap the the screen again to capture."

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
        handlePlay(textInto);
        setCapturedPrediction("introPlay");
    };

    const captureIntroPlay = () => {
        setCapturedPrediction("setup");
    };

    const caputureSetup = () => {
        setCapturedPrediction("setupPlay");
    };

    const caputureSetupPlay = () => {
        handlePlay(textSetUp);
        setCapturedPrediction(null);
    };

    const handlePlay = (text) => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance(text);
    
        u.onend = () => {
            // Speech synthesis has finished, proceed to the next action
            handleNextAction();
        };
    
        synth.speak(u);
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
            ) : capturedPrediction === "intro" || capturedPrediction === "introPlay" ? (
                <IntroPage />
            ) : capturedPrediction === "setup" || capturedPrediction === "setupPlay" ? (
                <SetUpPage />
            ) : (
                <OutputPage prediction={capturedPrediction} />
            )}
        </div>
    );}
    

export default App;
