import React, { useContext } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import "./DisplayGuideReview.css";

const ReviewCard = ({ userName, title, body, createdAt, recommendation, country }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <div>
            <h6 className="mb-0">{userName}</h6>
            <small className="text-muted">from {country}</small>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
  <small className="text-muted">
  {new Date(createdAt).toLocaleDateString("en-US")} • {recommendation}
  </small>
</div>
        <h5>{title}</h5>
       
        <p className="mt-3">{body}</p>

        {/* <small className="text-muted d-block mt-3">
            Written December 28, 2024
          </small> */}
        <small className="text-muted">
          This review is the subjective opinion of a TravelMate member and not
          of TravelMate LLC.
        </small>
      </Card.Body>
    </Card>
  );
};

const DisplayGuideReview = ({ guidId }) => {
  const { allGuideReviews } = useContext(ClientContext);
  const guideReviews = allGuideReviews.filter(
    (review) => review.guideId === parseInt(guidId)
  );

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0; // Avoid division by zero
    const totalOverallRating = reviews.reduce(
      (sum, review) => sum + review.overallRating,
      0
    );
    // const totalRoomRating = reviews.reduce((sum, review) => sum + review.foodRating, 0);
    // const totalServiceRating = reviews.reduce((sum, review) => sum + review.serviceRating, 0);
    // const totalValueRating = reviews.reduce((sum, review) => sum + review.valueRating, 0);
    // const totalLocationRating = reviews.reduce((sum, review) => sum + review.atmosphereRating, 0);
    // const averageRatings = { "overall": parseFloat((totalOverallRating / reviews.length).toFixed(2)), "food": parseFloat((totalFoodRating / reviews.length).toFixed(2)), "service": parseFloat((totalServiceRating / reviews.length).toFixed(2)), "value": parseFloat((totalValueRating / reviews.length).toFixed(2)), "atmosphere": parseFloat((totalAtmosphereRating / reviews.length).toFixed(2)) };
    const averageOverllRating = parseFloat(
      (totalOverallRating / reviews.length).toFixed(2)
    );
    return averageOverllRating;
  };

  const averageOverllRating = calculateAverageRating(guideReviews);

  const renderRatingDots = (rating) => {
    const maxDots = 5; // Maximum number of dots

    // Ensure `rating` is a valid number and within range
    if (typeof rating !== "number" || rating < 0 || rating > maxDots) {
      console.error("Invalid rating value:", rating);
      rating = 0; // Fallback to 0 for invalid ratings
    }

    const fullDots = Math.max(0, Math.min(Math.floor(rating), maxDots)); // Clamp fullDots
    const halfDot = rating % 1 !== 0 && fullDots < maxDots; // Check for halfDot
    const emptyDots = Math.max(0, maxDots - fullDots - (halfDot ? 1 : 0)); // Ensure non-negative emptyDots

    return (
      <div className="rating-dots d-flex justify-content-end align-items-center">
        {/* Full Dots */}
        {[...Array(fullDots)].map((_, index) => (
          <span key={`full-${index}`} className="rating-dot full"></span>
        ))}
        {/* Half Dot */}
        {halfDot && <span className="rating-dot half"></span>}
        {/* Empty Dots */}
        {[...Array(emptyDots)].map((_, index) => (
          <span key={`empty-${index}`} className="rating-dot empty"></span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
          className="p-4"
        >
          <div className="d-flex justify-content-between align-items-center p-4">
            <div className="d-flex align-items-center">
              <h5 className="mb-0 me-4 fw-bold">Reviews</h5>
              <div className="d-flex align-items-center">
                <h4 className="mb-0 me-2 text-warning fw-bold">
                  {averageOverllRating}
                </h4>
                <div className="d-flex">
                  {renderRatingDots(averageOverllRating)}
                </div>
        
              </div>
            </div>
            <div className="d-flex">
              <Link
                to={`/review/guides/${guidId}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="dark"
                  className="me-2 rounded-pill px-4 py-2 fw-bold"
                  style={{ fontSize: "0.9rem" }}
                >
                  Write a Review
                </Button>
              </Link>
            </div>
          </div>

          {guideReviews.map((review, id) => {
            return (
              <ReviewCard
                key={id}
                userName={review.userName}
                title={review.reviewTitle}
                body={review.reviewBody}
                createdAt={review.createdAt}
                recommendation={review.recommendation}
                country ={review.country}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default DisplayGuideReview;
