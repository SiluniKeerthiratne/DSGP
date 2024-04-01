import React, { useState } from "react";
import App from "../../App";



const OutputTwo = ( { isRottenData } ) => {
  const objectClass = isRottenData[0]; 
  const prediction = isRottenData[1];
  let text = null;
  
  const handlePlay = (text) => {
    // const [initail , setInitail] = useState(false)
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
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

  const handleClick = () => {
    handlePlay(text);
    if (prediction == "Rotten") {
      // setInitial("one")
      text = "The " + objectClass + " is rotten and can not be consumed"
      handlePlay(textOne);
    } else if (objectClass =="apple" || objectClass == "potato") {
      // setInitial("two")
      text = "The " + objectClass + " is fresh and sutable for consumption"
      handlePlay(textTwo);
    } else {
      // setInitial("three")
      text = "The " + objectClass + " is fresh and in " + prediction + " condition"
      handlePlay(textThree);
    }
  };
  return (
    <div  onClick = {handleClick}>
      
      <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>{text}</h1>
    </div>
  );
};

export default OutputTwo;