import './App.css'
import CustomWebcam from "./assets/Components/CustomWebcam/CustomWebcam"; // import it
import React, {useState, useEffect}from 'react';

function App() {
  const [data, setData] = useState([{}])

  useEffect(()=>{
    fetch("http://127.0.0.1:5000/members").then(
      res=> res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  },[])
  return (
    <div className='container'>
      <h1 className='text-sky-400'>SeeFresh</h1>
      <CustomWebcam />
      </div>
  )
}

export default App

