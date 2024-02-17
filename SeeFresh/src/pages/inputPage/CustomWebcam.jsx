import React, { useState, useEffect } from 'react';

const WebcamDisplay = () => {
  const [webcamFeed, setWebcamFeed] = useState(null);

  useEffect(() => {
    const fetchWebcamFeed = async () => {
      try {
        const response = await fetch('/process_webcam_feed');
        if (!response.ok) {
          throw new Error('Failed to fetch webcam feed');
        }
        const data = await response.json();
        setWebcamFeed(data.processed_frame);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchWebcamFeed, 1000); // Fetch webcam feed every second
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
      {webcamFeed && <img src={`data:image/jpeg;base64,${webcamFeed}`} alt="Processed Webcam Feed" />}
      <h1>yi</h1>
    </div>
  );
};

export default WebcamDisplay;
