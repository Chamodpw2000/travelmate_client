import { Link } from "react-router-dom";
import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { FaHeart, FaStar } from "react-icons/fa";

const PrePlannedTripCard = ({ id, type, name, price, duration, rating, mainImage }) => {
  // Default image to use if mainImage is not provided
  const defaultImage = "https://picsum.photos/286/180";
  
  return (
    <Link to={`/pre-planned-trips/${id}`} style={{ textDecoration: "none" }}  >
      <Card
        style={{
          width: "24rem",
          border: "none",
          backgroundColor: "#f8f9fa", // Change the card color here
        }}
        className="my-3"
      >
        <div style={{ position: "relative" }}>
          <Card.Img
            variant="top"
            src={mainImage || defaultImage}
            alt={`${name} Image`}
            style={{
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1), 0px -10px 20px rgba(255, 255, 255, 0.9)", // Uniform shadow
              borderRadius: "5px",
              height: "180px", // Fixed height for consistency
              objectFit: "cover", // Ensure the image covers the area properly
            }}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = defaultImage; // Fallback to default image on error
            }}
          />
          <Button
            variant="light"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              borderRadius: "20%",
              padding: "4px",
            }}
          >
            <FaHeart style={{ color: "black" }} />
          </Button>
        </div>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <div className="d-flex align-items-center mb-2">
            {/* Generate stars based on rating */}
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar 
                key={index}
                style={{ 
                  color: index < Math.floor(rating) ? "green" : "gray" 
                }} 
              />
            ))}
            <Badge bg="light" text="dark" className="ms-2">
              {rating}
            </Badge>
          </div>
          <Card.Text>${price} per person</Card.Text>
          {duration && <Card.Text>Duration: {duration} days</Card.Text>}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PrePlannedTripCard;