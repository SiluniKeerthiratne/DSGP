const OutputOne = ({ detectedObjectsData }) => {
  if (!detectedObjectsData || !detectedObjectsData.isObjectDetected) {
    return <div>No objects detected</div>;
  }

  return (
    <div>
      <h1>{detectedObjectsData.objectClass}</h1>
    </div>
  );
};

export default OutputOne;
