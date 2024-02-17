const OutputPage = ({ prediction }) => {
  return (
      <div className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal'>
          <h3>{prediction}</h3>
      </div>
  );
};

export default OutputPage;

