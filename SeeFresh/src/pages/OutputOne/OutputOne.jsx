const OutputOne = ({ detectedObjectsData }) => {
  if (!detectedObjectsData || !detectedObjectsData.isObjectDetected) {
    return <div>No objects detected</div>;
  }

  return (
    <div onClick={}>
      <h1>A {detectedObjectsData.objectClass} is detected on the screen, should we capture it. Tap on screen if you want to capture it</h1>
    </div>
  );
};

export default OutputOne;