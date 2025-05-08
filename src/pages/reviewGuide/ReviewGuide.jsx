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

const ReviewGuide = () => {
  const user = JSON.parse(localStorage.getItem("user"));
console.log("user", user);

    const [modalData, setModalData] = useState({
        show: false,
        title: "",
        message: "",
      });

      const { allGuides } = useContext(ClientContext);
        const { id } = useParams();
        const guide = allGuides.find((e) => e.id === parseInt(id));

         // Add new state for user name
          const [userName, setUserName] = useState(user.firstName + " " + user.lastName);
          const [reviewTitle, setReviewTitle] = useState("");
          const [reviewBody, setReviewBody] = useState("");
          const [overallRating, setOverallRating] = useState(0);
          const [serviceRating, setServiceRating] = useState(0);
          const [valueRating, setValueRating] = useState(0);
          const [hoverOverallRating, setHoverOverallRating] = useState(0);
          const [hoverServiceRating, setHoverServiceRating] = useState(0);
          const [hoverValueRating, setHoverValueRating] = useState(0);
        
          
            const maxNameLength = 20;
            const maxTitleLength = 120;
            const maxBodyLength = 1000;
            const [selectedRecommendation, setSelectedRecommendation] =
              useState("Select one");
          
              // Handle rating hover and click functions remain the same
  const handleMouseEnter = (index, type) => {
    if (type === "overall") setHoverOverallRating(index);
    else if (type === "service") setHoverServiceRating(index);
    else if (type === "value") setHoverValueRating(index);
  };

  const handleMouseLeave = (type) => {
    if (type === "overall") setHoverOverallRating(0);
    else if (type === "service") setHoverServiceRating(0);
    else if (type === "value") setHoverValueRating(0);
  };
  const handleRatingClick = (index, type) => {
    if (type === "overall") setOverallRating(index);
    else if (type === "service") setServiceRating(index);
    else if (type === "value") setValueRating(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      guideId: parseInt(id),
      userName: userName, // Add userName to the review data
      title: reviewTitle,
      body: reviewBody,
      overallRating: overallRating,
      serviceRating: serviceRating,
      valueRating: valueRating,
      recommendation: selectedRecommendation,
      country: user.country
    };

    try {
      const response = await axios.post(
        "https://travelmate-backend-zuqb.onrender.com/travelmate/addGuideReview",
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
    setServiceRating(0);
    setValueRating(0);
    setSelectedRecommendation("");
    
  };

  const isFormValid = () => {
    return (
      userName && // Add userName to form validation
      reviewTitle &&
      reviewBody &&
      overallRating > 0 &&
      serviceRating > 0 &&
      valueRating > 0 &&
      selectedRecommendation !== "Select one"
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
    {guide ? (
      <>
        <Container className="my-4">
          <h1 className="text-center fw-bold mb-5 mt-4">
            Tell us your experience with {guide.name}
          </h1>
          <Row>
            <Col md={4} className="px-4">
              <Card className="border border-0">
                <Card.Img
                  className="pt-4 px-4"
                  variant="top"
                  src={guide.cardImage}
                  alt=""
                />
                <Card.Body>
                  <Card.Title className="px-2 fw-bold">
                    {guide.name}
                  </Card.Title>
                  
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

                

               

                {/* recommondation */}
                <Form.Group className="mt-3">
                  <Form.Label>Do you reccomend {guide.name}?</Form.Label>
                  <Form.Select
                    value={selectedRecommendation}
                    onChange={(e) => setSelectedRecommendation(e.target.value)}
                  >
                    <option>Select One</option>
                    <option>Recommended</option>
                    <option>Not Recommended</option>
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
  </>  )
}

export default ReviewGuide