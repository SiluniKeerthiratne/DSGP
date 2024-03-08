import React, { useState } from "react";
import InputPage from "./pages/inputPage/InputPage";
import OutputOne from "./pages/OutputOne/OutputOne";

import './App.css';

const App = () => {
  const [detectedObjectData, setDetectedObjectData] = useState(null);

  // Reset detectedObjectData to null when OutputOne is loaded
  const handleOutputOneLoad = () => {
    setDetectedObjectData(null);
    console.log("set to null");
  };

  return (
    <div>
      {detectedObjectData ? (
        <OutputOne 
          detectedObjectsData={detectedObjectData}
          onLoad={handleOutputOneLoad} // Pass a callback to handle OutputOne load event
        />
      ) : (
        <InputPage onDataDetected={setDetectedObjectData} />
      )}
    </div>
  );
};

export default App;
