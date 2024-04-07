// InputPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const InputPage = ({ onDataDetected }) => {
  const [data, setData] = useState(null);
  const [src, setSrc] = useState("http://127.0.0.1:8000/video");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
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
    console.log('useEffect, INPUT', data);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <img
        src={src}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        alt="Video"
      />
    </div>
  );
};

export default InputPage;
