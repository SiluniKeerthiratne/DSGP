import React from 'react'
import Speech from 'react-text-to-speech'


const IntroPage = () => {

   
    return <Speech
        text='This is a fully customized speech component.'
        pitch={1.5}
        rate={2}
        volume={0.5}
        onError={() => console.error('Browser not supported!')}
    >
        {({ speechStatus, start, pause, stop }) => (
            <YourCustomComponent>
                {speechStatus !== 'started' && <button className='my-start-btn' onClick={start}>Start Speech</button>}
                {speechStatus === 'started' && <button className='my-pause-btn' onClick={pause}>Pause Speech</button>}
                <button className='my-stop-btn' onClick={stop}>Stop Speech</button>
            </YourCustomComponent>
        )}
    </Speech>}

export default IntroPage;


