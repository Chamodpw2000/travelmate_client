import React from 'react'
import clock from "../../assets/clock.png"

const CityHero = (city) => {
  return (
    <div>


      <div className=" py-5" style={{paddingInline:"120px"}}>
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img src={city.image} className="d-block mx-lg-auto img-fluid rounded" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3" style={{ color: "#0A2E41" }}>{city.name}</h1>

            <h4 className='py-3' style={{ color: "#0A2E41" }}>About</h4>
            <p className="lead" style={{ color: "#7094A7" }}>{city.description}</p>
            <div className='d-flex align-items-center py-5'>
              <img src={clock} style={{ width: "40px", height: "36px" , marginRight:"10px"}}  />
              <p className='my-0' style={{ color: "#0A2E41", fontWeight:"bold", fontSize:"20px" }}>Distance from Colombo: About {city.distance} km</p>
              </div>

          </div>
        </div>
      </div>



    </div>
  )
}

export default CityHero