import React from "react";
import App from "../../App";



const OutputTwo = ( { isRottenData } ) => {
  const handleClick = () => {
    <App />;
    console.log("clicked");
  };
  return (
    <div  onClick = {handleClick}>
      <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>This is {isRottenData}</h1>
    </div>
  );
};

export default OutputTwo;