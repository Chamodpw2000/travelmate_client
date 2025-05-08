import React from 'react'
import './AiTripPlanning.css'
import TripPlanning_Img from '../../assets/AiTripPlanning.png'

const AiTripPlanning = () => {
  return (


    <div className="container">

<div className='tripPlanning container d-flex'>
      <div className="tripPlanning-left">
        <span className="ai-badge">Powered by AI</span>
        
        <h1 className="main-title">
          Plan Your Perfect<br />
          Trip with AI
        </h1>
        
        <div className="subtitle">
          <h2>Get personalized travel</h2>
          <h2>itineraries in minutes,</h2>
          <h2>crafted by AI with real</h2>
          <h2>traveler insights.</h2>
        </div>
        
        <button className="plan-trip-btn">
          Plan a Trip with AI
        </button>
      </div>

      <div className="tripPlanning-right">
        <img src={TripPlanning_Img} alt="AI Trip Planning" />
      </div>
    </div>


      
    </div>
   
  )
}

export default AiTripPlanning
