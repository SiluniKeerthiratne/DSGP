import React from "react";
import App from "../../App";



const OutputTwo = ( { isRottenData } ) => {
  const objectClass = isRottenData[0]; 
  const prediction = isRottenData[1];
  let text = null;

  if (prediction == "Rotten") {
    text = "The " + objectClass + " is rotten and can not be consumed"
  } else if (objectClass =="apple" || objectClass == "potato") {
    text = "The " + objectClass + " is fresh and sutable for consumption"
  } else {
    text = "The " + objectClass + " is fresh and in " + prediction + " condition"
  }

  const handleClick = () => {
    <App />;
    console.log("clicked");
  };
  return (
    <div  onClick = {handleClick}>
      
      <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>{text}</h1>
    </div>
  );
};

export default OutputTwo;