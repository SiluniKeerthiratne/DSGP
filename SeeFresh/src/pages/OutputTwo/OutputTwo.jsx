import React from "react";

const OutputTwo = ({ isRottenData }) => {
  return (
    <div>
      {isRottenData === "Class 1" ? (
        <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>This Is Not Rotten</h1>
      ) : (
        <h1 className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal bg-black'>This is Rotten</h1>
      )}
    </div>
  );
};

export default OutputTwo;