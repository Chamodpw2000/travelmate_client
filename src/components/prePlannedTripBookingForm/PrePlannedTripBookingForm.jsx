import { useState } from "react";
import "./PrePlannedTripBookingForm.css";
// Removed react-bootstrap for Tailwind conversion
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
        "https://travelmate-backend-zuqb.onrender.com/travelmate/add-pre-planned-trip-bookings",
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
    <div className="flex flex-col mt-24 lg:flex-row items-center justify-center min-h-screen bg-gray-50 px-4 py-8 gap-8">
      {/* Form Section */}
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 mb-8 lg:mb-0">
        <h1 className="text-2xl font-bold mb-2 text-center">Book the Trip</h1>
        <p className="text-gray-600 text-center mb-6">
          Amazing stuff waiting for you and your friends / family! <br />
          You're just one step away from a new adventure.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Date */}
          <div className="flex flex-col">
            <label htmlFor="date" className="mb-1 font-medium">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={prePlannedTripBookingDetails.date}
              onChange={changeHandler}
              onBlur={handleBlur}
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.date && errors.date ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {touched.date && errors.date && 
              <span className="text-red-500 text-xs mt-1">{errors.date}</span>}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="travelerName" className="mb-1 font-medium">Your Name</label>
            <input
              type="text"
              id="travelerName"
              name="travelerName"
              value={prePlannedTripBookingDetails.travelerName}
              onChange={changeHandler}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.travelerName && errors.travelerName ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {touched.travelerName && errors.travelerName && 
              <span className="text-red-500 text-xs mt-1">{errors.travelerName}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">E-Mail Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={prePlannedTripBookingDetails.email}
              onChange={changeHandler}
              onBlur={handleBlur}
              placeholder="Enter your e-mail address"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {touched.email && errors.email && 
              <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={prePlannedTripBookingDetails.phone}
              onChange={changeHandler}
              onBlur={handleBlur}
              placeholder="Enter your phone number"
              className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {touched.phone && errors.phone && 
              <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
          </div>

          {/* Adults & Kids */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="adults" className="mb-1 font-medium">Adults</label>
              <input
                type="number"
                id="adults"
                name="adults"
                value={prePlannedTripBookingDetails.adults}
                onChange={changeHandler}
                onBlur={handleBlur}
                min="1"
                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.adults && errors.adults ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {touched.adults && errors.adults && 
                <span className="text-red-500 text-xs mt-1">{errors.adults}</span>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="kids" className="mb-1 font-medium">Kids</label>
              <input
                type="number"
                id="kids"
                name="kids"
                value={prePlannedTripBookingDetails.kids}
                onChange={changeHandler}
                onBlur={handleBlur}
                min="0"
                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${touched.kids && errors.kids ? 'border-red-500' : 'border-gray-300'}`}
              />
              {touched.kids && errors.kids && 
                <span className="text-red-500 text-xs mt-1">{errors.kids}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-400 text-white font-semibold rounded-md shadow hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Complete your booking'}
          </button>
        </form>
      </div>
      {/* Image Section */}
      <div className="w-full max-w-md flex justify-center">
        <img src="https://picsum.photos/500/700" alt="Travel Background" className="rounded-xl shadow-lg w-full h-auto object-cover" />
      </div>
    </div>
  );
};

export default PrePlannedTripBookingForm;