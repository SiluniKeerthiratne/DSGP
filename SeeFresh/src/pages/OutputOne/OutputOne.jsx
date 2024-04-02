import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutputTwo from '../OutputTwo/OutputTwo';
import App from '../../App';

const OutputOne = ({ detectedObjectsData }) => {
  const [clicked, setClicked] = useState(false);
  const [showComponentTwo, setShowComponentTwo] = useState('intial');
  const [rottenState, setRottenState] = useState(false);

  useEffect(() => {
    return () => {
      handlePlay(OutPutText);
      
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!clicked) {
        // If user hasn't clicked, show Input component
        // setShowComponentTwo(false);
      } else {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://127.0.0.1:8000/getPredictionOne");
            const jsonData = response.data;
            setRottenState([detectedObjectsData.objectClass, jsonData.prediction]); // Update state with fetched data
            console.log(jsonData);
            if (jsonData.prediction) {
              console.log("Prediction is true, handle accordingly");
              setShowComponentTwo(true);
              clearTimeout(timer);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData(); // Call fetchData function
      }
    }, 5000); // 10 seconds

    return () => clearTimeout(timer);
  }, [clicked]);

  const handlePlay = (text) => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 2;
    synth.speak(u);
  };

  const OutPutText = `A ${detectedObjectsData.objectClass} is detected on the screen, should we capture it. Tap on screen if you want to capture it`;


  const handleClick = () => {
    if(showComponentTwo==="intial"){
      setShowComponentTwo(null);
      
    } else if (showComponentTwo===null){
      setClicked(true);
    }
  };

  return (
    <div className='container' onClick={handleClick}>
      {showComponentTwo === null || showComponentTwo==="intial" ? (
        <div>
          <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>
            A {detectedObjectsData.objectClass} is detected on the screen, should we capture it. Tap on screen if you want to capture it
          </h1>
        </div>
      ) : showComponentTwo == true ? (
        <OutputTwo isRottenData={rottenState} />
      ) : (
        <App /> // Navigate back to InputPage without setting detected data
      )}
    </div>
  );
};

export default OutputOne;
