import TextToSpeech from "../../assets/Components/TextToSpeech/textToSpeech";
const setUpPage = () => {
    const t = "class"
    
      return (
        <div className='flex flex-col justify-center font-poppins text-white text-3xl mx-12 text-center font-semibold font-style: normal '>
            <div className='mb-6'>
                <h1>Tap once on the  the screen, </h1>
            </div>
            <div className='mb-6'>
                <h1>we will indicate with a “beep” if an object is placed within the screen, then tap the the screen again to capture.</h1> 
            </div>
            <TextToSpeech text={t} />      
    </div>
    )
  
};

export default setUpPage;
