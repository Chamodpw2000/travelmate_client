import { Link } from "react-router-dom";
import React from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./PrePlannedTripsMainSection.css";
import Galle_fort_image from "../../assets/GalleFortTour.png"; // Keep as fallback

const PrePlannedTripsMainSection = ({
  name,
  mainDestinations,
  guides,
  price,
  duration,
  noOfTravelers,
  startTime,
  startLocation,
  endTime,
  endLocation,
  description,
  availableDates,
  contactNumber,
  rating,
  tripId,
  mainImage, // Add this prop for the main image
}) => {
  // Use the provided main image or fall back to the default one
  const displayImage = mainImage || Galle_fort_image;

  return (
    <div className="trip-section">
      {/* Title */}
      <h1 className="trip-title">{name}</h1>
      <div className="trip-main-image">
        <img 
          src={displayImage} 
          alt={name} 
          className="trip-img"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = Galle_fort_image; // Fallback to default image on error
          }}
        />
      </div>
      <div className="trip-about">
        <p className="trip-description">{description}</p>
      </div>
      {/* Details */}
      <div className="trip-card flex flex-col lg:flex-row !items-center  ">
        {/* Left section: Main Destinations */}
        <div className="trip-destinations">
          {mainDestinations.map((destination, index) => (
            <div className="destination-item" key={index}>
              <FaMapMarkerAlt className="destination-icon" />
              <span>{destination}</span>
              {index !== mainDestinations.length - 1 && (
                <div className="dashed-line"></div>
              )}
            </div>
          ))}
        </div>
        {/* Right section: Details */}
        <div className="trip-details">
          {/* <p className="trip-available-days">
            <FaCalendarAlt className="icon" /> Available Days: {availableDates}
          </p> */}
          <div className="flex items-baseline gap-x-3">
            <FaUsers className="icon" /> No of Travelers: {noOfTravelers}
          </div>
            <div className="flex items-baseline gap-x-3">
              <FaClock className="icon" /> Start: {startTime}
              <FaMapMarkerAlt className="icon" /> {startLocation}
            </div>
            <div className="flex items-baseline gap-x-3">
              <FaClock className="icon" /> End: {endTime}
              <FaMapMarkerAlt className="icon" /> {endLocation}
            </div>
          <div className="trip-info">
            <span className="trip-duration">Duration: {duration} days</span>
            <span className="trip-price">From: ${price} per adult</span>
            <span className="trip-otherInfo">
              Meals & Accommodation: Included
            </span>
          </div>
          <Link to={`/pre-planned-trip-booking/${tripId}`}><button className="trip-button">Book Now</button></Link>
        </div>
      </div>
    </div>
  );
};

export default PrePlannedTripsMainSection;
