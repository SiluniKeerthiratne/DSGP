import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutputTwo from '../OutputTwo/OutputTwo';
import App from '../../App';
import InputPage from '../inputPage/InputPage';

const OutputOne = ({ detectedObjectsData }) => {
  const [showComponentTwo, setShowComponentTwo] = useState('initial');
  const [rottenState, setRottenState] = useState(false);
  const [detectedObjectData, setDetectedObjectData] = useState("initial");

  useEffect(() => {
    return () => {
      handlePlay(OutPutText);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/getPredictionOne");
      const jsonData = response.data;
      setRottenState([detectedObjectsData.objectClass, jsonData.prediction]); // Update state with fetched data
      console.log(jsonData);
      if (jsonData.prediction) {
        console.log("Prediction is true, handle accordingly");
        setShowComponentTwo(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowComponentTwo("input")
      console.log("setShowApp true")
    }, 5000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = (text) => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 2;
    synth.speak(u);
  };

  const OutPutText = `A ${detectedObjectsData.objectClass} is detected on the screen, should we capture it. Tap on screen if you want to capture it`;

  const handleClick = () => {
    console.log("screen clicked, going to outputTwo")
    fetchData();
    setShowComponentTwo("componentTwo")
  };

  return (
    <div className='container' onClick={handleClick}>
      {showComponentTwo === "initial" ? (
        <div>
          <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>
            {OutPutText}
          </h1>
        </div>
      ) : showComponentTwo === "componentTwo" ? (
        <OutputTwo isRottenData={rottenState} />
      ) : showComponentTwo === "input"  ? (
        <InputPage onDataDetected={setDetectedObjectData}/>
      ) : null}
    </div>
  );
};

export default OutputOne;
