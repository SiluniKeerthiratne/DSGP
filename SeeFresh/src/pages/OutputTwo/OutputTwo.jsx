import React, { useState, useEffect } from "react";
import App from "../../App";



const OutputTwo = ( { isRottenData } ) => {
  const objectClass = isRottenData[0]; 
  const prediction = isRottenData[1];
  let text = null;

  useEffect(() => {
    return () => {
      if (prediction == "Rotten") {
        handlePlay(textOne);
      } else if (objectClass =="apple" || objectClass == "potato") {
        handlePlay(textTwo);
      } else {
        handlePlay(textThree);
      }
      
    };
  }, []);
  
  const handlePlay = (text) => {
    // const [initail , setInitail] = useState(false)
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 2;
    synth.speak(u);
  };
  
  const textOne = `The ${objectClass} is rotten and can not be consumed`
  const textTwo = `The ${objectClass} is fresh and sutable for consumption`
  const textThree = `The ${objectClass} is fresh and in ${prediction} condition`

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

  const handleClickIn = () => {
    console.log("in handle paly baby")
    if (prediction == "Rotten") {
      handlePlay(textOne);
    } else if (objectClass =="apple" || objectClass == "potato") {
      handlePlay(textTwo);
    } else {
      handlePlay(textThree);
    }
  };
  return (
    <div  onClick = {handleClickIn}>
      
      <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>{text}</h1>
    </div>
  );
};

export default OutputTwo;