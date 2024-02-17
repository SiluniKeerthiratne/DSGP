import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const CustomWebcam = ({ webcamRef }) => {
    // Hook to get window size
    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });

        useEffect(() => {
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
            
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
        }, []);
        
        return windowSize;
    }

    const size = useWindowSize(); // Getting the window size

    // Calculating the aspect ratio
    const isLandscape = size.height <= size.width;
    const ratio = isLandscape ? size.width / size.height : size.height / size.width;

    return (
        <div className='flex flex-col justify-between w-full mx-6 mt-6'>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                height={size.height} // Setting height dynamically
                width={size.width} // Setting width dynamically
                videoConstraints={{ facingMode: 'user', aspectRatio: ratio }}
            />
        </div>
    );
};

export default CustomWebcam;
