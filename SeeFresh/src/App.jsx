import React, { useState, useEffect } from "react";
import InputPage from "./pages/inputPage/InputPage";
import OutputOne from "./pages/OutputOne/OutputOne";
import Intro from "./pages/IntroPage/IntroPage";
import SetUp from "./pages/SetupPage/SetupPage";

import './App.css';

const App = () => {
  const [detectedObjectData, setDetectedObjectData] = useState("one");

  // Reset detectedObjectData to null when OutputOne is loaded
  const handleOutputOneLoad = () => {
    setDetectedObjectData(null);
    console.log("set to null");
  };

  const handleClick = () => {
    if (detectedObjectData === "one") {
      setDetectedObjectData("two");
    } else if (detectedObjectData === "two") {
      setDetectedObjectData(null);
    }
  }

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <div onClick = {handleClick} className="container">
      {detectedObjectData === null ? (
        <InputPage onDataDetected={setDetectedObjectData} />
      ) : detectedObjectData === "one" ? (
        <Intro />
      ) : detectedObjectData === "two" ? (
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
