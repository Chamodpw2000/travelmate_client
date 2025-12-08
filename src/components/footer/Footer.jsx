import React from 'react'
import logo from "../../assets/Logo.png"
import SubscribeToNewsletter from '../SubscribeToNewsletter/SubscribeToNewsletter'
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div style={{ 
            background: 'linear-gradient(135deg, #1E5580 0%, #0A2A4A 100%)',
            boxShadow: '0 -10px 30px rgba(0,0,0,0.1)'
        }}>
            <div className="container mx-auto px-4">
                <footer className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-8 bg-red-10">
                        <div className="col-span-1 md:col-span-3 mb-4">
                            <img src={logo} alt="Logo" className="w-[150px] mb-5" />
                            <p className="text-gray-300 opacity-75">
                                Discover amazing experiences and connect with <br/> fellow travelers around the world.
                            </p>
                        </div>

                        <div className="col-span-6 md:col-span-2 mb-4 ">
                            <h5 className="text-white font-bold mb-4">Explore</h5>
                            <div className="flex flex-col space-y-2 text-white">
                                <div onClick={() => navigate('/')} className="text-gray-300 opacity-75 hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer">
                                    Home
                                </div>
                                <div onClick={() => navigate('/destinations')} className="text-gray-300 opacity-75 hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer">
                                    Destinations
                                </div>
                                <div onClick={() => navigate('/pre-planned-trips')} className="text-gray-300 opacity-75 hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer">
                                    Tours
                                </div>
                                <div onClick={() => navigate('/about')} className="text-gray-300 opacity-75 hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer">
                                    About Us
                                </div>
                            </div>
                        </div>

                        <div className="col-span-6 md:col-span-2 mb-4">
                            <h5 className="text-white font-bold mb-4">Support</h5>
                            <div className="flex flex-col space-y-2">
                                <div onClick={() => navigate('/help')} className="text-gray-300 opacity-75 hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer">
                                    Help Center
                                </div>
                                <div onClick={() => navigate('/safety')} className="text-gray-300 opacity-75 hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer">
                                    Safety
                                </div>
                                <div onClick={() => navigate('/covid-19')} className="text-gray-300 opacity-75 hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer">
                                    COVID-19
                                </div>
                                <div onClick={() => navigate('/contact')} className="text-gray-300 opacity-75 hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block cursor-pointer">
                                    Contact Us
                                </div>
                            </div>
                        </div>

                      
                    </div>

                      <div className="w-full ">
                            <div >
                                <SubscribeToNewsletter />
                            </div>
                        </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center py-4 mt-4 border-t border-gray-300 border-opacity-25 md:border-t-0">
                        <p className="text-gray-300 opacity-75 mb-4 sm:mb-0">&copy; 2024 TravelMate, Inc. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a className="text-gray-300 opacity-75 text-xl hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block" href="#">
                                <FaTwitter />
                            </a>
                            <a className="text-gray-300 opacity-75 text-xl hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block" href="#">
                                <FaInstagram />
                            </a>
                            <a className="text-gray-300 opacity-75 text-xl hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block" href="#">
                                <FaFacebook />
                            </a>
                            <a className="text-gray-300 opacity-75 text-xl hover:opacity-100 hover:text-white transition-all duration-300 hover:-translate-y-0.5 inline-block" href="#">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Footer
