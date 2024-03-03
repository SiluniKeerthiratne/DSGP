import React, { useState, useEffect } from "react";
import axios from "axios";

const InputPage = () => {
  const [detectedObject, setDetectedObject] = useState(null);
  const [dataReceived, setDataReceived] = useState(false);

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/video").then(
      res => res.json()
      ).then(
        data => {
          setData(data);
          console.log(data);
        }
      )}, []);
    

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
