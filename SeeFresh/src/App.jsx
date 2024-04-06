import React, { useState, useEffect, useRef } from "react";
import InputPage from "./pages/inputPage/InputPage";
import OutputOne from "./pages/OutputOne/OutputOne";
import Intro from "./pages/IntroPage/IntroPage";
import SetUp from "./pages/SetupPage/SetupPage";

import './App.css';

const App = () => {
  const [detectedObjectData, setDetectedObjectData] = useState("initial");

  useEffect(() => {
    return () => {
      if (detectedObjectData === "two") {
        handlePlay("Camera is on");
        console.log("in use effect");
      } else if (detectedObjectData !== "two" && detectedObjectData !== "one" && detectedObjectData !== "initial" && detectedObjectData !== null) {
        const OutPutText = `A ${detectedObjectData.objectClass} is detected on the screen. Tap on the screen if you want to capture it`;
        handlePlay(OutPutText);
      }
    };
  }, [detectedObjectData]);
  
  

  // Reset detectedObjectData to null when OutputOne is loaded
  const handleOutputOneLoad = () => {
    setDetectedObjectData(null);
    console.log("set to null");
  };

  const handlePlay = (text) => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 2;
    synth.speak(u);
  };

  const textInto = "Welcome to SeeFresh. Everything you need to know about your groceries just one click away!. Tap screen to continue"
  const textSetUp = "Tap on screen to open your camera, we will indicate if an object is detected"
  

  const handleClick = () => {
    if(detectedObjectData === "initial"){
      handlePlay(textInto);
      setDetectedObjectData("one")
    } else if (detectedObjectData === "one") {
      setDetectedObjectData("two");
      handlePlay(textSetUp);
    } else if (detectedObjectData === "two") {
      // handlePlay("camera is on");
      setDetectedObjectData(null);
    } 
  };

  useEffect(() => {
    console.log("mounted");
    setDetectedObjectData("initial");
    console.log("set to initial");
    

  }, []);

  return (
    <div onClick={handleClick} className="container">
      {detectedObjectData === null ? (
        <InputPage onDataDetected={setDetectedObjectData} />
      ) : detectedObjectData === "one" || detectedObjectData === "initial" ? (
        <Intro />
      ) : detectedObjectData === "two" || detectedObjectData === "two-initial" ? (
        <SetUp />
      ) : (
        <OutputOne 
          detectedObjectsData={detectedObjectData}
          handleOutputOneLoad = {handleOutputOneLoad}
           // Pass a callback to handle OutputOne load event
        />
      )}
    </div>
  );
};

export default App;
