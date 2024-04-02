import React, { useState, useEffect, useRef } from "react";
import InputPage from "./pages/inputPage/InputPage";
import OutputOne from "./pages/OutputOne/OutputOne";
import Intro from "./pages/IntroPage/IntroPage";
import SetUp from "./pages/SetupPage/SetupPage";

import './App.css';

const App = () => {
  const [detectedObjectData, setDetectedObjectData] = useState("initial");
 
  // useEffect(() => {
  //   return () => {
  //     setDetectedObjectData("initial")
  //     console.log("initll cajngrf")
  //   };
  // }, []);

  useEffect(() => {
    return () => {
      if (detectedObjectData === "two") {
        handlePlay("camera is on");
        console.log("in use effect");
      } else if (detectedObjectData !== "two" && detectedObjectData !== "one" && detectedObjectData !== "initial" && detectedObjectData !== null) {
        const OutPutText = `A ${detectedObjectData.objectClass} is detected on the screen, should we capture it. Tap on the screen if you want to capture it`;
        handlePlay(OutPutText);
      }
    };
  }, [detectedObjectData]);
  

  const beep = new Audio('/beep-01a.mp3'); // Replace 'beep.mp3' with your audio file path
      // beep.play();
  

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
  const textSetUp = "Tap once on the  the screen, we will indicate with a “beep” if an object is placed within the screen, then tap the the screen again to capture."
  

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
           // Pass a callback to handle OutputOne load event
        />
      )}
    </div>
  );
};

export default App;
