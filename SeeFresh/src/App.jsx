import React, { useState, useEffect } from "react";
import InputPage from "./pages/inputPage/InputPage";
import OutputOne from "./pages/OutputOne/OutputOne";
import Intro from "./pages/IntroPage/IntroPage";
import SetUp from "./pages/SetupPage/SetupPage";

import './App.css';

const App = () => {
  const [detectedObjectData, setDetectedObjectData] = useState("initial");

  // Reset detectedObjectData to null when OutputOne is loaded
  const handleOutputOneLoad = () => {
    setDetectedObjectData(null);
    console.log("set to null");
  };

  const handlePlay = (text) => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    synth.speak(u);
  };

  const textInto = "Welcome to SeeFresh. Everything you need to know about your groceries just one click away!. Tap screen to continue"
  const textSetUp = "Tap once on the  the screen, we will indicate with a “beep” if an object is placed within the screen, then tap the the screen again to capture."

  const handleClick = () => {
    if(detectedObjectData === "initial"){
      handlePlay(textInto);
      setDetectedObjectData("one")
    } else if (detectedObjectData === "one") {
      setDetectedObjectData("two-initial");
    } else if (detectedObjectData === "two-initial") {
      handlePlay(textSetUp);
      setDetectedObjectData("two")
    } else if (detectedObjectData === "two") {
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
          onLoad={handleOutputOneLoad} // Pass a callback to handle OutputOne load event
        />
      )}
    </div>
  );
};

export default App;
