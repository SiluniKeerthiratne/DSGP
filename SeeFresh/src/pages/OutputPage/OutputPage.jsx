import CustomWebcam from "../../assets/Components/CustomWebcam/CustomWebcam";
const OutputPage = ({capturedPrediction}) => {
  const reCapture =  ()=> {
    }
  
    return (
  
    <div>
      
      <h3 className="text-white font-poppins font-semibold text-base">{capturedPrediction}</h3>
      <button onClick={reCapture} className="bg-black border-2 border-white rounded text-white w-full h-20 font-poppins font-semibold text-base mb-6" >Re-Capture</button>
      
    </div>
  );
};

export default OutputPage;
