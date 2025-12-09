import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { ClientContext } from "../../context/ClientContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReviewRestaurant = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [modalData, setModalData] = useState({ show: false, title: '', message: '' });

    const { allRestaurants } = useContext(ClientContext);
    const { id } = useParams();
    const restaurant = allRestaurants.find((e) => e.id === parseInt(id));

    // Add new state for user name
    const [userName, setUserName] = useState(user.firstName + " " + user.lastName);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewBody, setReviewBody] = useState("");
    const [overallRating, setOverallRating] = useState(0);
    const [foodRating, setFoodRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0);
    const [valueRating, setValueRating] = useState(0);
    const [atmosphereRating, setAtmosphereRating] = useState(0);
    const [hoverOverallRating, setHoverOverallRating] = useState(0);
    const [hoverFoodRating, setHoverFoodRating] = useState(0);
    const [hoverServiceRating, setHoverServiceRating] = useState(0);
    const [hoverValueRating, setHoverValueRating] = useState(0);
    const [hoverAtmosphereRating, setHoverAtmosphereRating] = useState(0);

    const maxNameLength = 20;
    const maxTitleLength = 120;
    const maxBodyLength = 1000;
    const [selectedFamilyTypeOption, setSelectedFamilyTypeOption] = useState("");
    const [selectedVisitDate, setSelectedVisitDate] = useState("January 2024");
    const [selectedPurpose, setSelectedPurpose] = useState("Select one");

    const handleFamilyTypeOptionClick = (option) => {
        setSelectedFamilyTypeOption(option);
    };

    // Handle rating hover and click functions remain the same
    const handleMouseEnter = (index, type) => {
        if (type === "overall") setHoverOverallRating(index);
        else if (type === "food") setHoverFoodRating(index);
        else if (type === "service") setHoverServiceRating(index);
        else if (type === "value") setHoverValueRating(index);
        else if (type === "atmosphere") setHoverAtmosphereRating(index);
    };

    const handleMouseLeave = (type) => {
        if (type === "overall") setHoverOverallRating(0);
        else if (type === "food") setHoverFoodRating(0);
        else if (type === "service") setHoverServiceRating(0);
        else if (type === "value") setHoverValueRating(0);
        else if (type === "atmosphere") setHoverAtmosphereRating(0);
    };

    const handleRatingClick = (index, type) => {
        if (type === "overall") setOverallRating(index);
        else if (type === "food") setFoodRating(index);
        else if (type === "service") setServiceRating(index);
        else if (type === "value") setValueRating(index);
        else if (type === "atmosphere") setAtmosphereRating(index);
    };
const navigater = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const reviewData = {
            restaurantId: parseInt(id),
            userName: userName, // Add userName to the review data
            title: reviewTitle,
            body: reviewBody,
            overallRating: overallRating,
            foodRating: foodRating,
            serviceRating: serviceRating,
            valueRating: valueRating,
            atmosphereRating: atmosphereRating,
            familyType: selectedFamilyTypeOption,
            visitDate: selectedVisitDate,
            mealType: selectedPurpose
        };

        try {
            const response = await axios.post("https://travelmate-backend-zuqb.onrender.com/travelmate/addRestaurantReview", reviewData)
            console.log("Review Submitted:", reviewData);
            console.log(response.data);
            if (response.data.success) {
                setModalData({
                    show: true,
                    title: 'Success!',
                    message: 'Your review has been added successfully!',
                });

                setTimeout(() => {navigater(`/restaurants/${id}`);}, 2000); // Close the modal after 2 seconds


            }
            else {
                alert("Error submitting review");
            }


        } catch (error) {
            console.log("Error  uploading the review", error);

        }
        resetForm();
    };

    const resetForm = () => {
        setUserName(""); // Reset userName
        setReviewTitle("");
        setReviewBody("");
        setOverallRating(0);
        setFoodRating(0);
        setServiceRating(0);
        setValueRating(0);
        setAtmosphereRating(0);
        setSelectedFamilyTypeOption("");
        setSelectedVisitDate("January 2024");
        setSelectedPurpose("Select one");
    };

    const isFormValid = () => {
        return (
            userName && // Add userName to form validation
            reviewTitle &&
            reviewBody &&
            overallRating > 0 &&
            foodRating > 0 &&
            serviceRating > 0 &&
            valueRating > 0 &&
            atmosphereRating > 0 &&
            selectedFamilyTypeOption &&
            selectedVisitDate &&
            selectedPurpose !== "Select one"
        );
    };

    return (
        <div className="mt-32 px-4 sm:px-6 lg:px-8">
            <Modal
                show={modalData.show}
                onHide={() => setModalData({ show: false, title: '', message: '' })}
                centered
            >
                <Modal.Body className="text-center p-5">
                    <p className="text-lg text-gray-800 pt-5">{modalData.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{
                            backgroundColor: '#00A1FF',
                            borderColor: '#00A1FF',
                        }}
                        onClick={() => setModalData({ show: false, title: '', message: '' })}
                        className="py-2 px-4 text-base rounded-lg"
                    >
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            {restaurant ? 
                <div className="max-w-7xl mx-auto my-4 sm:my-6 lg:my-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-6 sm:mb-8 lg:mb-10 mt-4">
                        Tell us your experience at {restaurant.restaurantName}
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Restaurant Card */}
                        <div className="w-full lg:w-1/3">
                            <div className="border-0">
                                <img 
                                    className="pt-4 px-4 w-full h-auto rounded-lg object-cover" 
                                    src={restaurant.images[0]} 
                                    alt="Cafe Chill" 
                                />
                                <div className="p-4">
                                    <h5 className="px-2 font-bold text-lg sm:text-xl">{restaurant.restaurantName}</h5>
                                    <p className="px-2 text-gray-600 text-sm sm:text-base">{restaurant.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="w-full lg:w-2/3">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Field */}
                                <div className="w-full sm:w-2/3 lg:w-1/2">
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium">Your Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Overall Rating */}
                                <div>
                                    <label className="block mb-2 text-sm font-medium">
                                        Rate your <span className="font-bold">Overall</span> experience
                                    </label>
                                    <div className="flex gap-1 sm:gap-2">
                                        {[...Array(5)].map((_, index) => (
                                            <span 
                                                key={index} 
                                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#00A1FF] cursor-pointer transition-colors" 
                                                style={{ 
                                                    backgroundColor: (hoverOverallRating || overallRating) > index ? "#00A1FF" : "transparent"
                                                }} 
                                                onMouseEnter={() => handleMouseEnter(index + 1, "overall")} 
                                                onMouseLeave={() => handleMouseLeave("overall")} 
                                                onClick={() => handleRatingClick(index + 1, "overall")} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Food Rating */}
                                <div>
                                    <label className="block mb-2 text-sm font-bold mt-2">Food</label>
                                    <div className="flex gap-1 sm:gap-2">
                                        {[...Array(5)].map((_, index) => (
                                            <span 
                                                key={index} 
                                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#00A1FF] cursor-pointer transition-colors" 
                                                style={{ 
                                                    backgroundColor: (hoverFoodRating || foodRating) > index ? "#00A1FF" : "transparent"
                                                }} 
                                                onMouseEnter={() => handleMouseEnter(index + 1, "food")} 
                                                onMouseLeave={() => handleMouseLeave("food")} 
                                                onClick={() => handleRatingClick(index + 1, "food")} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Service Rating */}
                                <div>
                                    <label className="block mb-2 text-sm font-bold mt-2">Service</label>
                                    <div className="flex gap-1 sm:gap-2">
                                        {[...Array(5)].map((_, index) => (
                                            <span 
                                                key={index} 
                                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#00A1FF] cursor-pointer transition-colors" 
                                                style={{ 
                                                    backgroundColor: (hoverServiceRating || serviceRating) > index ? "#00A1FF" : "transparent"
                                                }} 
                                                onMouseEnter={() => handleMouseEnter(index + 1, "service")} 
                                                onMouseLeave={() => handleMouseLeave("service")} 
                                                onClick={() => handleRatingClick(index + 1, "service")} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Value Rating */}
                                <div>
                                    <label className="block mb-2 text-sm font-bold mt-2">Value</label>
                                    <div className="flex gap-1 sm:gap-2">
                                        {[...Array(5)].map((_, index) => (
                                            <span 
                                                key={index} 
                                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#00A1FF] cursor-pointer transition-colors" 
                                                style={{ 
                                                    backgroundColor: (hoverValueRating || valueRating) > index ? "#00A1FF" : "transparent"
                                                }} 
                                                onMouseEnter={() => handleMouseEnter(index + 1, "value")} 
                                                onMouseLeave={() => handleMouseLeave("value")} 
                                                onClick={() => handleRatingClick(index + 1, "value")} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Atmosphere Rating */}
                                <div>
                                    <label className="block mb-2 text-sm font-bold mt-2">Atmosphere</label>
                                    <div className="flex gap-1 sm:gap-2">
                                        {[...Array(5)].map((_, index) => (
                                            <span 
                                                key={index} 
                                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#00A1FF] cursor-pointer transition-colors" 
                                                style={{ 
                                                    backgroundColor: (hoverAtmosphereRating || atmosphereRating) > index ? "#00A1FF" : "transparent"
                                                }} 
                                                onMouseEnter={() => handleMouseEnter(index + 1, "atmosphere")} 
                                                onMouseLeave={() => handleMouseLeave("atmosphere")} 
                                                onClick={() => handleRatingClick(index + 1, "atmosphere")} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Visit Date and Companion Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium">When did you go?</label>
                                        <select 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={selectedVisitDate} 
                                            onChange={(e) => setSelectedVisitDate(e.target.value)}
                                        >
                                            <option>January 2024</option>
                                            <option>February 2024</option>
                                            <option>March 2024</option>
                                            <option>April 2024</option>
                                            <option>May 2024</option>
                                            <option>June 2024</option>
                                            <option>July 2024</option>
                                            <option>Auguest 2024</option>
                                            <option>September 2024</option>
                                            <option>October 2024</option>
                                            <option>November 2024</option>
                                            <option>December 2024</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">Who did you go with?</label>
                                        <div className="flex flex-wrap gap-2">
                                            {["Solo", "Family", "Friends", "Couple", "Business"].map((option) => (
                                                <button
                                                    type="button"
                                                    key={option}
                                                    onClick={() => handleFamilyTypeOptionClick(option)}
                                                    className="px-3 py-1.5 text-sm sm:text-base border border-[#00A1FF] rounded transition-colors"
                                                    style={{
                                                        backgroundColor: selectedFamilyTypeOption === option ? '#00A1FF' : 'transparent',
                                                        color: selectedFamilyTypeOption === option ? 'white' : '#00A1FF',
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Purpose of Visit */}
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium">What were you here for?</label>
                                    <select 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={selectedPurpose} 
                                        onChange={(e) => setSelectedPurpose(e.target.value)}
                                    >
                                        <option>Select one</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                        <option>Casual Outing</option>
                                    </select>
                                </div>

                                {/* Review Title */}
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium">
                                        Title your review{" "}
                                        <span className="text-gray-500">({reviewTitle.length}/{maxTitleLength})</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Add a title to your review..." 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        maxLength={maxTitleLength} 
                                        value={reviewTitle} 
                                        onChange={(e) => setReviewTitle(e.target.value)} 
                                    />
                                </div>

                                {/* Review Text */}
                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium">
                                        Write your review{" "}
                                        <span className="text-gray-500">({reviewBody.length}/{maxBodyLength})</span>
                                    </label>
                                    <textarea 
                                        rows={4} 
                                        placeholder="Add your review..." 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        maxLength={maxBodyLength} 
                                        value={reviewBody} 
                                        onChange={(e) => setReviewBody(e.target.value)} 
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!isFormValid()}
                                    className="mt-4 w-full sm:w-auto px-6 py-3 bg-[#C1EAF8] text-black rounded-md font-medium hover:bg-[#A0D9E8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
         : <></>}
        </div>
    );
};

export default ReviewRestaurant;