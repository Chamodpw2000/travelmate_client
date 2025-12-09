import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/TravalMate Logo.png';
import SigninModal from '../signinModal/SigninModal';
import { motion } from 'framer-motion';


const BookingsModal = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleNavigation = (path) => {
    handleClose();
    navigate(path);
  };
  
  return (
    <>
      <div onClick={handleShow} className="cursor-pointer py-2 px-3 text-white hover:text-blue-200 transition-colors font-medium">
        My Bookings
      </div>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClose}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold">My Bookings</h3>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none font-light">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col space-y-3 gap-y-3">
                <button 
                  className="bg-blue-600 text-white py-3 px-4 !rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => handleNavigation('/mybookings/available')}
                >
                  Hotel Bookings
                </button>
                <button 
                  className="bg-blue-600 text-white py-3 px-4 !rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => handleNavigation('/myguidbookings/available')}
                >
                  Guide Bookings
                </button>
                <button 
                  className="bg-blue-600 text-white py-3 px-4 !rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => handleNavigation('/myVehicleBooking/available')}
                >
                  Transportation Bookings
                </button>
                <button 
                  className="bg-blue-600 text-white py-3 px-4 !rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => handleNavigation('/package-bookings')}
                >
                  Package Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`} style={{ backgroundColor: '#1b4f78' }}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
              <div className="bg-[#DDE8EE] p-0 rounded-tl-[20px] rounded-br-[20px] inline-flex items-center mr-2">
                <img src={logo} alt="Logo" className="w-[50px]" />
              </div>
              <span className="text-2xl font-bold text-white">Travel Mate</span>
            </div>
          </motion.div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white hover:text-blue-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {localStorage.getItem("user") && (
              <div onClick={() => navigate('/profile')} className="py-2 px-3 text-white hover:text-blue-200 transition-colors cursor-pointer font-medium">
                Profile
              </div>
            )}
            {localStorage.getItem("user") && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <BookingsModal />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <SigninModal />
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-2">
            {localStorage.getItem("user") && (
              <div onClick={() => navigate('/profile')} className="py-2 px-3 text-white hover:text-blue-200 transition-colors cursor-pointer font-medium">
                Profile
              </div>
            )}
            {localStorage.getItem("user") && (
              <BookingsModal />
            )}
            <SigninModal />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
