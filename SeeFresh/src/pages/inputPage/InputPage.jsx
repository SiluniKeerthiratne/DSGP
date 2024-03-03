import React, { useState, useEffect } from "react";
import axios from "axios";

const InputPage = () => {
  const [detectedObject, setDetectedObject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/getDetection");
        const jsonData = await response.json();
        setDetectedObject(jsonData); // Update state with fetched data
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data initially

    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <img
        src="http://127.0.0.1:8000/video"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt="Video"
      />
    </div>
  );
};

export default InputPage;
