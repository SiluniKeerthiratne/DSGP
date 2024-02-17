// VideoFeed.js

import React, { useEffect, useRef } from 'react';

const VideoFeed = () => {
  const videoRef = useRef();

  useEffect(() => {
    const videoElement = videoRef.current;
    const streamUrl = '/video_feed';

    if (videoElement) {
      const startStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
          videoElement.srcObject = stream;
        } catch (err) {
          console.error('Error accessing camera:', err);
        }
      };

      startStream();
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h3 className="mt-5">Live Streaming</h3>
          <video ref={videoRef} width="100%" autoPlay playsInline />
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;
