import React from 'react';
import './Hero.css';
import SearchBar from '../searchBar/SearchBar';
import NavbarComponent from '../navbarComponent/NavbarComponent';
import logo from '../../assets/logo.png';
import SigninModal from '../signinModal/SigninModal';

const Hero = () => {
    return (
        <>
            {/* <NavbarComponent /> */}
            <header className="hero-section">
                <div className="banner-text">
                    <p className="hero-tagline">
                        Let's Explore Sri Lanka <br /> with
                    </p>
                    <h1 className="hero-title">TRAVEL MATE</h1>
                    <div className="search-container">
                        <SearchBar />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Hero;
