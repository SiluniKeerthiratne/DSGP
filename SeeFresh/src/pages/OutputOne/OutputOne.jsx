import React, { useState, useEffect } from "react";
import axios from "axios";
import OutputTwo from "../OutputTwo/OutputTwo";

const OutputOne = ({ detectedObjectsData }) => {
  const [rottenState, setRottenState] = useState(false);
  const [initialTimerDone, setInitialTimerDone] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setInitialTimerDone(true);
    }, 10000);

    return () => clearTimeout(initialTimer);
  }, []);

  const handleClick = () => {
    setClicked(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/getPredictionOne");
        const jsonData = response.data;
        setRottenState(jsonData.prediction); // Update state with fetched data
        console.log(jsonData);
        if (jsonData.prediction === true) {
          console.log("Prediction is true, handle accordingly");
          // Add code to stop fetching data if needed
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!initialTimerDone && !rottenState) {
      fetchData();
    }
  }, [initialTimerDone, rottenState]);

  if (!detectedObjectsData || !detectedObjectsData.isObjectDetected) {
    return <div>No objects detected</div>;
  }

  if (clicked) {
    // Render OutputTwo component or do something else
    return <OutputTwo isRottenData= {rottenState}/>;
  } else {
    // Go to InputPage or set up later logic
    console.log("Not clicked within 10 seconds");
  }

  return (
    <div onClick={handleClick}>
      <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>
        A {detectedObjectsData.objectClass} is detected on the screen, should we capture it. Tap on screen if you want to capture it
      </h1>
    </div>
  );
};

export default OutputOne;
