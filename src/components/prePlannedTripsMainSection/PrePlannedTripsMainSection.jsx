import { Link } from "react-router-dom";
import React from "react";
import {
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./PrePlannedTripsMainSection.css";
import Galle_fort_image from "../../assets/GalleFortTour.png";

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
}) => {
  return (
    <div className="trip-section">
      {/* Title */}
      <h1 className="trip-title">{name}</h1>
      <div className="trip-main-image">
        <img src={Galle_fort_image} alt={name} className="trip-img" />
      </div>
      <div className="trip-about">
        <p className="trip-description">{description}</p>
      </div>
      {/* Details */}
      <div className="trip-card">
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
          <p className="trip-available-days">
            <FaCalendarAlt className="icon" /> Available Days: {availableDates}
          </p>
          <p className="no-of-travelers">
            <FaUsers className="icon" /> No of Travelers: {noOfTravelers}
          </p>
          <p className="trip-startInfo">
            <FaClock className="icon" /> Start: {startTime}{" "}
            <FaMapMarkerAlt className="icon" />
            {startLocation}
          </p>
          <p className="trip-endInfo">
            <FaClock className="icon" /> End: {endTime}{" "}
            <FaMapMarkerAlt className="icon" />
            {endLocation}
          </p>

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
