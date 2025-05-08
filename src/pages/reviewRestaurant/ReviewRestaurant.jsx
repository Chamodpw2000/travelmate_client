import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { ClientContext } from "../../context/ClientContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReviewRestaurant = () => {
    const [modalData, setModalData] = useState({ show: false, title: '', message: '' });

    const { allRestaurants } = useContext(ClientContext);
    const { id } = useParams();
    const restaurant = allRestaurants.find((e) => e.id === parseInt(id));

    // Add new state for user name
    const [userName, setUserName] = useState("");
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
            const response = await axios.post("http://localhost:3000/travelmate/addRestaurantReview", reviewData)
            console.log("Review Submitted:", reviewData);
            console.log(response.data);
            if (response.data.success) {
                setModalData({
                    show: true,
                    title: 'Success!',
                    message: 'Your review has been added successfully!',
                });
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
        <>
            <Modal
                show={modalData.show}
                onHide={() => setModalData({ show: false, title: '', message: '' })}
                centered
            >
                <Modal.Body style={{ textAlign: 'center', padding: '5px' }}>
                    <p style={{ fontSize: '18px', color: '#333' }} className="pt-5">{modalData.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{
                            backgroundColor: '#00A1FF',
                            borderColor: '#00A1FF',
                            fontSize: '16px',
                            borderRadius: '8px',
                        }}
                        onClick={() => setModalData({ show: false, title: '', message: '' })}
                        className="py-2 px-4"
                    >
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
            {restaurant ? <>
                <Container className="my-4">
                    <h1 className="text-center fw-bold mb-5 mt-4">
                        Tell us your experience at {restaurant.restaurantName}
                    </h1>
                    <Row>
                        <Col md={4} className="px-4">
                            <Card className="border border-0">
                                <Card.Img className='pt-4 px-4' variant="top" src="https://picsum.photos/500" alt="Cafe Chill" />
                                <Card.Body>
                                    <Card.Title className='px-2 fw-bold'>{restaurant.restaurantName}</Card.Title>
                                    <Card.Text className='px-2'>{restaurant.address}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={8}>
                            <Form onSubmit={handleSubmit}>
                                {/* New Name Field */}
                                <Col md={6}>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Your Name
                                            <span className="text-muted"> ({userName.length}/{maxNameLength}) </span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your name"
                                            maxLength={maxNameLength}
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                {/* Rest of the form groups remain the same */}
                                <Form.Group>
                                    <Form.Label>Rate your <span className="fw-bold">Overall</span> experience</Form.Label>
                                    <div className="d-flex gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverOverallRating || overallRating) > index ? "#00A1FF" : "transparent", border: "2px solid #00A1FF", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "overall")} onMouseLeave={() => handleMouseLeave("overall")} onClick={() => handleRatingClick(index + 1, "overall")} />
                                        ))}
                                    </div>
                                </Form.Group>

                                {/* Food Rating Section */}
                                <Form.Group>
                                    <Form.Label className="fw-bold mt-2">Food</Form.Label>
                                    <div className="d-flex gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverFoodRating || foodRating) > index ? "#00A1FF" : "transparent", border: "2px solid #00A1FF", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "food")} onMouseLeave={() => handleMouseLeave("food")} onClick={() => handleRatingClick(index + 1, "food")} />
                                        ))}
                                    </div>
                                </Form.Group>

                                {/* Service Rating Section */}
                                <Form.Group>
                                    <Form.Label className="fw-bold mt-2">Service</Form.Label>
                                    <div className="d-flex gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverServiceRating || serviceRating) > index ? "#00A1FF" : "transparent", border: "2px solid #00A1FF", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "service")} onMouseLeave={() => handleMouseLeave("service")} onClick={() => handleRatingClick(index + 1, "service")} />
                                        ))}
                                    </div>
                                </Form.Group>

                                {/* Value Rating Section */}
                                <Form.Group>
                                    <Form.Label className="fw-bold mt-2">Value</Form.Label>
                                    <div className="d-flex gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverValueRating || valueRating) > index ? "#00A1FF" : "transparent", border: "2px solid #00A1FF", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "value")} onMouseLeave={() => handleMouseLeave("value")} onClick={() => handleRatingClick(index + 1, "value")} />
                                        ))}
                                    </div>
                                </Form.Group>

                                {/* Atmosphere Rating Section */}
                                <Form.Group>
                                    <Form.Label className="fw-bold mt-2">Atmosphere</Form.Label>
                                    <div className="d-flex gap-1">
                                        {[...Array(5)].map((_, index) => (
                                            <span key={index} className="rating-circle" style={{ width: "25px", height: "25px", borderRadius: "50%", backgroundColor: (hoverAtmosphereRating || atmosphereRating) > index ? "#00A1FF" : "transparent", border: "2px solid #00A1FF", cursor: "pointer", }} onMouseEnter={() => handleMouseEnter(index + 1, "atmosphere")} onMouseLeave={() => handleMouseLeave("atmosphere")} onClick={() => handleRatingClick(index + 1, "atmosphere")} />
                                        ))}
                                    </div>
                                </Form.Group>

                                {/* Dropdowns for Visit Date and Family Type */}
                                <Row className="mt-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>When did you go?</Form.Label>
                                            <Form.Select value={selectedVisitDate} onChange={(e) => setSelectedVisitDate(e.target.value)}>
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
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Who did you go with?</Form.Label>
                                            <div className="d-flex gap-2">
                                                {["Solo", "Family", "Friends", "Couple", "Business"].map((option) => (
                                                    <Button
                                                        key={option}
                                                        onClick={() => handleFamilyTypeOptionClick(option)}
                                                        style={{
                                                            backgroundColor: selectedFamilyTypeOption === option ? '#00A1FF' : 'transparent',
                                                            color: selectedFamilyTypeOption === option ? 'white' : '#00A1FF',
                                                            border: '1px solid #00A1FF'
                                                        }}
                                                    >
                                                        {option}
                                                    </Button>
                                                ))}
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                {/* Purpose of Visit */}
                                <Form.Group className="mt-3">
                                    <Form.Label>What were you here for?</Form.Label>
                                    <Form.Select value={selectedPurpose} onChange={(e) => setSelectedPurpose(e.target.value)}>
                                        <option>Select one</option>
                                        <option>Lunch</option>
                                        <option>Dinner</option>
                                        <option>Casual Outing</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Review Title */}
                                <Form.Group className="mt-3">
                                    <Form.Label> Title your review{" "}
                                        <span className="text-muted"> ({reviewTitle.length}/{maxTitleLength}) </span></Form.Label>
                                    <Form.Control type="text" placeholder="Add a title to your review..." maxLength={maxTitleLength} value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} />
                                </Form.Group>

                                {/* Review Text Block */}
                                <Form.Group className="mt-3">
                                    <Form.Label> Write your review{" "}
                                        <span className="text-muted"> ({reviewBody.length}/{maxBodyLength}) </span></Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Add your review..." maxLength={maxBodyLength} value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} />
                                </Form.Group>

                                {/* Submit Button */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={!isFormValid()}
                                    className="mt-4"
                                    style={{
                                        backgroundColor: '#C1EAF8',
                                        border: 'none',
                                        color: '#000000'
                                    }}
                                >
                                    Submit Review
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </> : <></>}
        </>
    );
};

export default ReviewRestaurant;