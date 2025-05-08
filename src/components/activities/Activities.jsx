import React from 'react'
import beach from "../../assets/Beachactivities.png"
import { Button } from 'react-bootstrap'
import logo from "../../assets/TravalMateLogo2.png"
import surfing from "../../assets/surfing.png"
import tekling from "../../assets/Tekling.png"
import Hiking from "../../assets/Hiking.png"
import food from "../../assets/Food.png"
import culture from "../../assets/culture.png"
import "../activities/activities.css"
import { Link, useNavigate } from 'react-router-dom';


const Activities = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{ backgroundColor: '#C0EBFE', fontSize: "36px", fontWeight: "bold" }} className="w-full">
                <p className="p-5 text-center m-5">See what you can do in Sri Lanka</p>
            </div>

            <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
                {/* First Row - Beach Activities and Surfing */}
                <div className="row d-none d-xxl-flex  justify-content-center align-items-center">
                    <div className="col-md-6 mb-4 px-4 pt-5" style={{
                        backgroundImage: `url(${beach})`,
                        backgroundSize: 'cover', // Adjusts the background to cover the entire div
                        backgroundPosition: 'center',
                        height: "960px", width: "656px"
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: "880px", width: "600px" }}>
                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Beach Activities
                                </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Link to={'/beach-activities'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        className=" px-4 py-1 border-0 rounded-pill"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div>Discover More</div>
                                            <div>
                                                <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 mb-4" style={{ height: "960px", width: "660px" }}>
                        <div className=" mb-4 p-4 pt-5" style={{
                            display: 'flex', flexDirection: 'column', height: "467px", width: "656px",

                            backgroundImage: `url(${surfing})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                        }}>

                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Surfing                                </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Link to={'/surfing'} style={{ textDecoration: 'none' }}>

                                    <Button
                                        className="px-4 py-1 border-0 rounded-pill"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div>Discover More</div>
                                            <div>
                                                <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className=" mb-3 p-4 pt-5" style={{
                            display: 'flex', flexDirection: 'column', height: "467px", width: "656px",

                            backgroundImage: `url(${tekling})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                        }}>

                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Trekking                               </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Link to={'/trekking'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        className="px-4 py-1 border-0 rounded-pill"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div>Discover More</div>
                                            <div>
                                                <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="  d-xxl-none justify-content-center align-items-center">
                    <div className="col-md-6 mb-4 px-4 pt-5" style={{
                        backgroundImage: `url(${beach})`,
                        backgroundSize: 'cover', // Adjusts the background to cover the entire div
                        backgroundPosition: 'center',
                        height: "960px", width: "656px"
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: "880px", width: "600px" }}>
                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Beach Activities
                                </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Link to={'/activities'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        className="px-4 py-1 border-0 rounded-pill"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div>Discover More</div>
                                            <div>
                                                <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 mb-4" style={{ height: "960px", width: "660px" }}>
                        <div className=" mb-4 p-4 pt-5" style={{
                            display: 'flex', flexDirection: 'column', height: "467px", width: "656px",

                            backgroundImage: `url(${surfing})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                        }}>

                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Surfing                                </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Link to={'/activities'} style={{ textDecoration: 'none' }}>

                                    <Button
                                        className="px-4 py-1 border-0 rounded-pill"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div>Discover More</div>
                                            <div>
                                                <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className=" mb-3 p-4 pt-5" style={{
                            display: 'flex', flexDirection: 'column', height: "467px", width: "656px",

                            backgroundImage: `url(${tekling})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                        }}>
                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Trekking                               </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Link to={'/activities'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        className="px-4 py-1 border-0 rounded-pill"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div>Discover More</div>
                                            <div>
                                                <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Third Row - Hiking (full width) */}


                <div className="d-none d-xxl-flex   mb-3 p-4 pt-5 rounded-4" style={{
                    display: 'flex', flexDirection: 'column', height: "467px", width: "1335px",

                    backgroundImage: `url(${Hiking})`,
                    backgroundSize: 'cover', // Adjusts the background to cover the entire div
                    backgroundPosition: 'center'

                }}>

                    <div>
                        <h1 className="font-weight-bold text-white">
                            Hiking                               </h1>
                    </div>

                    <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                        <Link to={'/hiking'} style={{ textDecoration: 'none' }}>
                            <Button
                                className="px-4 py-1 border-0 rounded-pill"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                            >
                                <div className="d-flex align-items-center">
                                    <div>Discover More</div>
                                    <div>
                                        <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                    </div>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className=" d-xxl-none mb-3 p-4 pt-5 rounded-4" style={{
                    display: 'flex', flexDirection: 'column', height: "466px", width: "656px",

                    backgroundImage: `url(${Hiking})`,
                    backgroundSize: 'cover', // Adjusts the background to cover the entire div
                    backgroundPosition: 'center',
                }}>

                    <div>
                        <h1 className="font-weight-bold text-white">
                            Hiking                              </h1>
                    </div>

                    <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                        <Link to={'/activities'} style={{ textDecoration: 'none' }}>
                            <Button
                                className="px-4 py-1 border-0 rounded-pill"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                            >
                                <div className="d-flex align-items-center">
                                    <div>Discover More</div>
                                    <div>
                                        <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                    </div>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Fourth Row - Food and Cultural Attractions */}

                <div>

                    <div className='d-flex mb-3 mt-2 d-none d-xxl-flex' style={{ height: "467px", width: "1335px" }}>


                        <div className=" mb-3 p-4 pt-5 rounded-4" style={{
                            display: 'flex', flexDirection: 'column', height: "466px", width: "656px",

                            backgroundImage: `url(${food})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                        }}>
                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Food                             </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Link to={'/food'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        className="px-4 py-1 border-0 rounded-pill"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div>Discover More</div>
                                            <div>
                                                <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className=" mb-3 p-4 pt-5 rounded-4" style={{
                            display: 'flex', flexDirection: 'column', height: "466px", width: "662px", marginLeft: "15px",

                            backgroundImage: `url(${culture})`,
                            backgroundSize: 'cover', // Adjusts the background to cover the entire div
                            backgroundPosition: 'center',
                        }}>

                            <div>
                                <h1 className="font-weight-bold text-white">
                                    Cultural Attractions                             </h1>
                            </div>

                            <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                                <Link to={'/activities'} style={{ textDecoration: 'none' }}>
                                    <Button
                                        className="px-4 py-1 border-0 rounded-pill"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                                    >
                                        <div className="d-flex align-items-center">
                                            <div>Discover More</div>
                                            <div>
                                                <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-xxl-none mb-3 p-4 pt-5 rounded-4" style={{
                    display: 'flex', flexDirection: 'column', height: "466px", width: "656px",

                    backgroundImage: `url(${food})`,
                    backgroundSize: 'cover', // Adjusts the background to cover the entire div
                    backgroundPosition: 'center',
                }}>

                    <div>
                        <h1 className="font-weight-bold text-white">
                            Food                           </h1>
                    </div>

                    <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                        <Link to={'/activities'} style={{ textDecoration: 'none' }}>
                            <Button
                                className="px-4 py-1 border-0 rounded-pill"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                            >
                                <div className="d-flex align-items-center">
                                    <div>Discover More</div>
                                    <div>
                                        <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                    </div>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>


                <div className=" d-xxl-none mb-3 p-4 pt-5 rounded-4" style={{
                    display: 'flex', flexDirection: 'column', height: "466px", width: "656px",

                    backgroundImage: `url(${culture})`,
                    backgroundSize: 'cover', // Adjusts the background to cover the entire div
                    backgroundPosition: 'center',
                }}>

                    <div>
                        <h1 className="font-weight-bold text-white">
                            Cultural Activities
                        </h1>
                    </div>

                    <div style={{ marginTop: 'auto', marginLeft: "auto" }}>
                        <Link to={'/activities'} style={{ textDecoration: 'none' }}>
                            <Button
                                className="px-4 py-1 border-0 rounded-pill"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.71)', color: '#0A2E41', fontWeight: 'bold', fontSize: "25px" }}
                            >
                                <div className="d-flex align-items-center">
                                    <div>Discover More</div>
                                    <div>
                                        <img src={logo} alt="logo" style={{ width: '30px', marginLeft: '10px', marginBottom: '8px' }} />
                                    </div>
                                </div>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Activities