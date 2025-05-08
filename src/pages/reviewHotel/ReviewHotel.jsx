import React, { useContext, useState } from "react";
import { ClientContext } from "../../context/ClientContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAllAccomodations } from "../../../../backend/controller/AccommodationController";

const ReviewHotel = () => {
  const [modalData, setModalData] = useState({
    show: false,
    title: "",
    message: "",
  });

  const { allAccommodations } = useContext(ClientContext);
  const { id } = useParams();
  const hotel = allAccommodations.find((e) => e.id === parseInt(id));

  // Add new state for user name
  const [userName, setUserName] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [roomRating, setRoomRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [hoverOverallRating, setHoverOverallRating] = useState(0);
  const [hoverRoomRating, setHoverRoomRating] = useState(0);
  const [hoverServiceRating, setHoverServiceRating] = useState(0);
  const [hoverValueRating, setHoverValueRating] = useState(0);
  const [hoverLocationRating, setHoverLocationRating] = useState(0);

  const maxNameLength = 20;
  const maxTitleLength = 120;
  const maxBodyLength = 1000;
  const [selectedTravelTypeOption, setSelectedTravelTypeOption] = useState("");
  const [selectedVisitDate, setSelectedVisitDate] = useState("January 2025");
  const [selectedStayDuration, setSelectedStayDuration] =
    useState("Select one");

  const handleTravelTypeOptionClick = (option) => {
    setSelectedTravelTypeOption(option);
  };

  // Handle rating hover and click functions remain the same
  const handleMouseEnter = (index, type) => {
    if (type === "overall") setHoverOverallRating(index);
    else if (type === "room") setHoverRoomRating(index);
    else if (type === "service") setHoverServiceRating(index);
    else if (type === "value") setHoverValueRating(index);
    else if (type === "location") setHoverLocationRating(index);
  };

  const handleMouseLeave = (type) => {
    if (type === "overall") setHoverOverallRating(0);
    else if (type === "room") setHoverRoomRating(0);
    else if (type === "service") setHoverServiceRating(0);
    else if (type === "value") setHoverValueRating(0);
    else if (type === "location") setHoverLocationRating(0);
  };

  const handleRatingClick = (index, type) => {
    if (type === "overall") setOverallRating(index);
    else if (type === "room") setRoomRating(index);
    else if (type === "service") setServiceRating(index);
    else if (type === "value") setValueRating(index);
    else if (type === "location") setLocationRating(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      hotelId: parseInt(id),
      userName: userName, // Add userName to the review data
      title: reviewTitle,
      body: reviewBody,
      overallRating: overallRating,
      roomRating: roomRating,
      serviceRating: serviceRating,
      valueRating: valueRating,
      locationRating: locationRating,
      travelType: selectedTravelTypeOption,
      visitDate: selectedVisitDate,
      stayDuration: selectedStayDuration,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/travelmate/addHotelReview",
        reviewData
      );
      console.log("Review Submitted:", reviewData);
      console.log(response.data);
      if (response.data.success) {
        setModalData({
          show: true,
          title: "Success!",
          message: "Your review has been added successfully!",
        });
      } else {
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
    setRoomRating(0);
    setServiceRating(0);
    setValueRating(0);
    setLocationRating(0);
    setSelectedTravelTypeOption("");
    setSelectedVisitDate("January 2025");
    setSelectedStayDuration("");
  };

  const isFormValid = () => {
    return (
      userName && // Add userName to form validation
      reviewTitle &&
      reviewBody &&
      overallRating > 0 &&
      roomRating > 0 &&
      serviceRating > 0 &&
      valueRating > 0 &&
      locationRating > 0 &&
      selectedTravelTypeOption &&
      selectedVisitDate &&
      selectedStayDuration !== "Select one"
    );
  };

  return (
    <>
      <Modal
        show={modalData.show}
        onHide={() => setModalData({ show: false, title: "", message: "" })}
        centered
      >
        <Modal.Body style={{ textAlign: "center", padding: "5px" }}>
          <p style={{ fontSize: "18px", color: "#333" }} className="pt-5">
            {modalData.message}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#00A1FF",
              borderColor: "#00A1FF",
              fontSize: "16px",
              borderRadius: "8px",
            }}
            onClick={() =>
              setModalData({ show: false, title: "", message: "" })
            }
            className="py-2 px-4"
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      {hotel ? (
        <>
          <Container className="my-4">
            <h1 className="text-center fw-bold mb-5 mt-4">
              Tell us your experience at {hotel.name}
            </h1>
            <Row>
              <Col md={4} className="px-4">
                <Card className="border border-0">
                  <Card.Img
                    className="pt-4 px-4"
                    variant="top"
                    src="https://picsum.photos/500"
                    alt="Hotel Marabedda"
                  />
                  <Card.Body>
                    <Card.Title className="px-2 fw-bold">
                      {hotel.hotelName}
                    </Card.Title>
                    <Card.Text className="px-2">{hotel.address}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={8}>
                <Form onSubmit={handleSubmit}>
                  {/* New Name Field */}
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>
                        Your Name
                        <span className="text-muted">
                          {" "}
                          ({userName.length}/{maxNameLength}){" "}
                        </span>
                      </Form.Label>
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
                    <Form.Label>
                      Rate your <span className="fw-bold">Overall</span>{" "}
                      experience
                    </Form.Label>
                    <div className="d-flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className="rating-circle"
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                            backgroundColor:
                              (hoverOverallRating || overallRating) > index
                                ? "#00A1FF"
                                : "transparent",
                            border: "2px solid #00A1FF",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() =>
                            handleMouseEnter(index + 1, "overall")
                          }
                          onMouseLeave={() => handleMouseLeave("overall")}
                          onClick={() =>
                            handleRatingClick(index + 1, "overall")
                          }
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Room Rating Section */}
                  <Form.Group>
                    <Form.Label className="fw-bold mt-2">Room</Form.Label>
                    <div className="d-flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className="rating-circle"
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                            backgroundColor:
                              (hoverRoomRating || roomRating) > index
                                ? "#00A1FF"
                                : "transparent",
                            border: "2px solid #00A1FF",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() =>
                            handleMouseEnter(index + 1, "room")
                          }
                          onMouseLeave={() => handleMouseLeave("room")}
                          onClick={() => handleRatingClick(index + 1, "room")}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Service Rating Section */}
                  <Form.Group>
                    <Form.Label className="fw-bold mt-2">Service</Form.Label>
                    <div className="d-flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className="rating-circle"
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                            backgroundColor:
                              (hoverServiceRating || serviceRating) > index
                                ? "#00A1FF"
                                : "transparent",
                            border: "2px solid #00A1FF",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() =>
                            handleMouseEnter(index + 1, "service")
                          }
                          onMouseLeave={() => handleMouseLeave("service")}
                          onClick={() =>
                            handleRatingClick(index + 1, "service")
                          }
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Value Rating Section */}
                  <Form.Group>
                    <Form.Label className="fw-bold mt-2">Value</Form.Label>
                    <div className="d-flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className="rating-circle"
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                            backgroundColor:
                              (hoverValueRating || valueRating) > index
                                ? "#00A1FF"
                                : "transparent",
                            border: "2px solid #00A1FF",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() =>
                            handleMouseEnter(index + 1, "value")
                          }
                          onMouseLeave={() => handleMouseLeave("value")}
                          onClick={() => handleRatingClick(index + 1, "value")}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Location Rating Section */}
                  <Form.Group>
                    <Form.Label className="fw-bold mt-2">Location</Form.Label>
                    <div className="d-flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className="rating-circle"
                          style={{
                            width: "25px",
                            height: "25px",
                            borderRadius: "50%",
                            backgroundColor:
                              (hoverLocationRating || locationRating) > index
                                ? "#00A1FF"
                                : "transparent",
                            border: "2px solid #00A1FF",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() =>
                            handleMouseEnter(index + 1, "location")
                          }
                          onMouseLeave={() => handleMouseLeave("atmosphere")}
                          onClick={() =>
                            handleRatingClick(index + 1, "location")
                          }
                        />
                      ))}
                    </div>
                  </Form.Group>

                  {/* Dropdowns for Visit Date and Family Type */}
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>When did you go?</Form.Label>
                        <Form.Select
                          value={selectedVisitDate}
                          onChange={(e) => setSelectedVisitDate(e.target.value)}
                        >
                          <option>January 2025</option>
                          <option>February 2025</option>
                          <option>March 2025</option>
                          <option>April 2025</option>
                          <option>May 2025</option>
                          <option>June 2025</option>
                          <option>July 2025</option>
                          <option>August 2025</option>
                          <option>September 2025</option>
                          <option>October 2025</option>
                          <option>November 2025</option>
                          <option>December 2025</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Who did you go with?</Form.Label>
                        <div className="d-flex gap-2">
                          {[
                            "Solo",
                            "Family",
                            "Friends",
                            "Couple",
                            "Business",
                          ].map((option) => (
                            <Button
                              key={option}
                              onClick={() =>
                                handleTravelTypeOptionClick(option)
                              }
                              style={{
                                backgroundColor:
                                  selectedTravelTypeOption === option
                                    ? "#00A1FF"
                                    : "transparent",
                                color:
                                  selectedTravelTypeOption === option
                                    ? "white"
                                    : "#00A1FF",
                                border: "1px solid #00A1FF",
                              }}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Stay Duration */}
                  <Form.Group className="mt-3">
                    <Form.Label>Stay Duration?</Form.Label>
                    <Form.Select
                      value={selectedStayDuration}
                      onChange={(e) => setSelectedStayDuration(e.target.value)}
                    >
                      <option>Select One</option>
                      <option>1-3 Nights</option>
                      <option>3-5 Nights</option>
                      <option>More than 5 Nights</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Review Title */}
                  <Form.Group className="mt-3">
                    <Form.Label>
                      {" "}
                      Title your review{" "}
                      <span className="text-muted">
                        {" "}
                        ({reviewTitle.length}/{maxTitleLength}){" "}
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Add a title to your review..."
                      maxLength={maxTitleLength}
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                    />
                  </Form.Group>

                  {/* Review Text Block */}
                  <Form.Group className="mt-3">
                    <Form.Label>
                      {" "}
                      Write your review{" "}
                      <span className="text-muted">
                        {" "}
                        ({reviewBody.length}/{maxBodyLength}){" "}
                      </span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Add your review..."
                      maxLength={maxBodyLength}
                      value={reviewBody}
                      onChange={(e) => setReviewBody(e.target.value)}
                    />
                  </Form.Group>

                  {/* Submit Button */}
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid()}
                    className="mt-4"
                    style={{
                      backgroundColor: "#C1EAF8",
                      border: "none",
                      color: "#000000",
                    }}
                  >
                    Submit Review
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ReviewHotel;
