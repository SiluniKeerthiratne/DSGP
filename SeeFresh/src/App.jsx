import React, { useEffect, useRef } from "react";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <img src="http://127.0.0.1:8000/video"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      alt="Video"/>
  </div>
  
  );
};

export default App;
