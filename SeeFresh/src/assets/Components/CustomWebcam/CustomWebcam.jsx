import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const CustomWebcam = ({onPredictionReceived}) => {
    const webcamRef = useRef(null);

    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const formData = new FormData();
        formData.append('image', dataURItoBlob(imageSrc));

        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        onPredictionReceived(data.prediction);
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };
    const videoConstraints = {
        width: 420,
        height: 620,
        facingMode: "user",
      };

    return (
        
        <div className='flex flex-col justify-between w-full mx-6 mt-6'>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                height={400}
                width={400}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture} className="bg-black border-2 border-white rounded text-white w-full h-20 font-poppins font-semibold text-base mb-6" >Capture</button>
        </div>
    );
};

export default CustomWebcam;
