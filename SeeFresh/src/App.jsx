import React, { useState } from "react";
import InputPage from "./pages/inputPage/InputPage";
import OutputOne from "./pages/OutputOne/OutputOne";

import './App.css';

const App = () => {
  const [detectedObjectData, setDetectedObjectData] = useState(null);

  return (
    <div>
      {detectedObjectData ? (
        <OutputOne detectedObjectsData={detectedObjectData} />
      ) : (
        <InputPage onDataDetected={setDetectedObjectData} />
      )}
    </div>
  );
};

export default App;
