import React from 'react'
import logo from "../../assets/Logo.png"
import SubscribeToNewsletter from '../SubscribeToNewsletter/SubscribeToNewsletter'
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
    return (
        <div style={{ 
            background: 'linear-gradient(135deg, #1E5580 0%, #0A2A4A 100%)',
            boxShadow: '0 -10px 30px rgba(0,0,0,0.1)'
        }}>
            <div className="container">
                <footer className="py-5">
                    <div className="row g-5">
                        <div className="col-12 col-md-3 mb-4">
                            <img src={logo} alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
                            <p className="text-light opacity-75">
                                Discover amazing experiences and connect with fellow travelers around the world.
                            </p>
                        </div>

                        <div className="col-6 col-md-2 mb-4">
                            <h5 className="text-white fw-bold mb-4">Explore</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-light opacity-75 hover-effect">
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-light opacity-75 hover-effect">
                                        Destinations
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-light opacity-75 hover-effect">
                                        Tours
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-light opacity-75 hover-effect">
                                        About Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-6 col-md-2 mb-4">
                            <h5 className="text-white fw-bold mb-4">Support</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-light opacity-75 hover-effect">
                                        Help Center
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-light opacity-75 hover-effect">
                                        Safety
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-light opacity-75 hover-effect">
                                        COVID-19
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-light opacity-75 hover-effect">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-5 mb-4">
                            <div className="p-4">
                                <SubscribeToNewsletter />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 mt-4 border-top border-light border-opacity-25">
                        <p className="text-light opacity-75">&copy; 2024 TravelMate, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex gap-3 mb-0">
                            <li>
                                <a className="text-light opacity-75 fs-5 hover-effect" href="#">
                                    <FaTwitter />
                                </a>
                            </li>
                            <li>
                                <a className="text-light opacity-75 fs-5 hover-effect" href="#">
                                    <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a className="text-light opacity-75 fs-5 hover-effect" href="#">
                                    <FaFacebook />
                                </a>
                            </li>
                            <li>
                                <a className="text-light opacity-75 fs-5 hover-effect" href="#">
                                    <FaLinkedin />
                                </a>
                            </li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer
