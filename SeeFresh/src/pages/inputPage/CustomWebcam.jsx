import React from 'react';
import Webcam from 'react-webcam';

const CustomWebcam = ({ webcamRef }) => {
    const videoConstraints = {
        width: 420,
        height: 620,
        facingMode: 'user',
    };

    return (
        <div className='flex flex-col justify-between w-full mx-6 mt-6'>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                height={400}
                width={400}
                videoConstraints={videoConstraints}
            />
        </div>
    );
};

export default CustomWebcam;
