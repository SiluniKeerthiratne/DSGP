// InputPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const InputPage = ({ onDataDetected }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/getDetection");
        const jsonData = await response.json();
        setData(jsonData); // Update state with fetched data
        console.log(jsonData);
        if (jsonData.isObjectDetected === true) {
          onDataDetected(jsonData);
          clearInterval(intervalId);
          // add code to stop fetching data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(intervalId);
  }, [onDataDetected]);

  useEffect(() => {
    if (data != null) {
    setData(null)}
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
