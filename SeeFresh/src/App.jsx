import './App.css';
import React from 'react';
import InputPage from './pages/inputPage/inputPage'
import CustomWebcam from './assets/Components/CustomWebcam/CustomWebcam';
import { useState } from 'react';
import OutputPage from './pages/OutputPage/OutputPage';

function App() {
    const [capturedPrediction, setCapturedPrediction] = useState(null);

    // Function to receive prediction from CustomWebcam
    const handlePredictionReceived = (prediction) => {
        setCapturedPrediction(prediction);
        
    };
    return (
        <div className='container'>
             
           
            {capturedPrediction ? <OutputPage prediction={capturedPrediction}/> : <CustomWebcam onPredictionReceived={handlePredictionReceived} /> }
            {console.log(capturedPrediction)}
            {capturedPrediction && <h1 className='text-white'>Captured Prediction: {capturedPrediction}</h1>}
        </div>
    );
}

export default App;



