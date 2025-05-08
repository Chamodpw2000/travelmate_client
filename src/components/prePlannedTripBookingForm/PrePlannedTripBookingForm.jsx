import { useState } from "react";
import "./PrePlannedTripBookingForm.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PrePlannedTripBookingForm = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [prePlannedTripBookingDetails, setPrePlannedTripBookingDetails] = useState({
    prePlannedTripId: tripId,
    date: "",
    travelerName: "",
    email: "",
    phone: "",
    adults: 1,
    kids: 0,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'date':
        return !value ? 'Date is required' : '';
      case 'travelerName':
        return !value.trim() ? 'Traveler name is required' : 
               value.length < 3 ? 'Name must be at least 3 characters' : '';
      case 'email':
        return !value ? 'Email is required' : 
               !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : '';
      case 'phone':
        return !value ? 'Phone number is required' : 
               !/^\d{10}$/.test(value) ? 'Phone number must be 10 digits' : '';
      case 'adults':
        return value < 1 ? 'At least 1 adult is required' : '';
      case 'kids':
        return value < 0 ? 'Kids count cannot be negative' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(prePlannedTripBookingDetails).forEach(key => {
      const error = validateField(key, prePlannedTripBookingDetails[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPrePlannedTripBookingDetails(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const touchedFields = {};
    Object.keys(prePlannedTripBookingDetails).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    if (!validateForm()) {
      setIsSubmitting(false);
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Validation Error',
      //   text: 'Please fill all required fields correctly',
      //   timer: 2000
      // });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/add-pre-planned-trip-bookings",
        prePlannedTripBookingDetails
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registered Successfully!",
        showConfirmButton: false,
        timer: 1500
      });

      setTimeout(() => {
        navigate(`/pre-planned-trips/${tripId}`);
      }, 1500);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Registration failed",
        text: error.response?.data?.message || 'Something went wrong',
        showConfirmButton: false,
        timer: 1800
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <div className="form-section">
        <h1>Book the Trip</h1>
        <p>
          Amazing stuff waiting for you and your friends / family! <br />
          You're just one step away from a new adventure.
        </p>
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <Row>
            <Col>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={prePlannedTripBookingDetails.date}
                  onChange={changeHandler}
                  onBlur={handleBlur}
                  className={touched.date && errors.date ? 'error-input' : ''}
                  required
                />
                {touched.date && errors.date && 
                  <span className="error-message">{errors.date}</span>}
              </div>
            </Col>
          </Row>

          <div className="form-group">
            <label htmlFor="travelerName">Your Name</label>
            <input
              type="text"
              id="travelerName"
              name="travelerName"
              value={prePlannedTripBookingDetails.travelerName}
              onChange={changeHandler}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              className={touched.travelerName && errors.travelerName ? 'error-input' : ''}
              required
            />
            {touched.travelerName && errors.travelerName && 
              <span className="error-message">{errors.travelerName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={prePlannedTripBookingDetails.email}
              onChange={changeHandler}
              onBlur={handleBlur}
              placeholder="Enter your e-mail address"
              className={touched.email && errors.email ? 'error-input' : ''}
              required
            />
            {touched.email && errors.email && 
              <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={prePlannedTripBookingDetails.phone}
              onChange={changeHandler}
              onBlur={handleBlur}
              placeholder="Enter your phone number"
              className={touched.phone && errors.phone ? 'error-input' : ''}
              required
            />
            {touched.phone && errors.phone && 
              <span className="error-message">{errors.phone}</span>}
          </div>

          <Row>
            <Col>
              <div className="form-group small-inputs">
                <label htmlFor="adults">Adults</label>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  value={prePlannedTripBookingDetails.adults}
                  onChange={changeHandler}
                  onBlur={handleBlur}
                  min="1"
                  className={touched.adults && errors.adults ? 'error-input' : ''}
                  required
                />
                {touched.adults && errors.adults && 
                  <span className="error-message">{errors.adults}</span>}

                <label htmlFor="kids">Kids</label>
                <input
                  type="number"
                  id="kids"
                  name="kids"
                  value={prePlannedTripBookingDetails.kids}
                  onChange={changeHandler}
                  onBlur={handleBlur}
                  min="0"
                  className={touched.kids && errors.kids ? 'error-input' : ''}
                />
                {touched.kids && errors.kids && 
                  <span className="error-message">{errors.kids}</span>}
              </div>
            </Col>
          </Row>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Complete your booking'}
          </button>
        </form>
      </div>
      <div className="image-section">
        <img src="https://picsum.photos/500/700" alt="Travel Background" />
      </div>
    </div>
  );
};

export default PrePlannedTripBookingForm;