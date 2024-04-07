import React, { useState, useEffect } from "react";
import App from "../../App";



const OutputTwo = ( { isRottenData } ) => {
  const [goToApp, setgoToApp] = useState(false);
  const objectClass = isRottenData[0]; 
  const prediction = isRottenData[1];
  let text = null;

  useEffect(() => {
    if (goToApp === true) {
      setgoToApp(false);
      console.log('useEffect, outputTwo', goToApp);
    }
  }, []);

  useEffect(() => {
    return () => {
     
      if (prediction == "Rotten") {
        handlePlay(textOne);
      } else if (objectClass =="apple" || objectClass == "potato") {
        handlePlay(textTwo);
      } else {
        handlePlay(textThree);
      }}
  }, []);

  
  
  const handlePlay = (text) => {
    // const [initail , setInitail] = useState(false)
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 2;
    console.log("voice over playing")
    synth.speak(u);
  };
  
  const textOne = `The ${objectClass} is rotten and can not be consumed. Tap screen to capture an item again`
  const textTwo = `The ${objectClass} is fresh and sutable for consumption. Tap screen to capture an item again`
  const textThree = `The ${objectClass} is fresh and in ${prediction} condition. Tap screen to capture an item again`

  if (prediction == "Rotten") {
    // setInitial("one")
    text = "The " + objectClass + " is rotten and can not be consumed"
  } else if (objectClass =="apple" || objectClass == "potato") {
    // setInitial("two")
    text = "The " + objectClass + " is fresh and sutable for consumption"
  } else {
    // setInitial("three")
    text = "The " + objectClass + " is fresh and in " + prediction + " condition"
  }

  const handleClick = () => {
    setgoToApp(true);
  };

 
  
  return (
    <div onClick={handleClick}>
      {goToApp === false ? (
        <div className='h-full'>
          <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>{text}. Tap screen to capture an item again</h1>
        </div>
      ) : (
        <App />
      )}
      
      
    </div>
  );
};

export default OutputTwo;