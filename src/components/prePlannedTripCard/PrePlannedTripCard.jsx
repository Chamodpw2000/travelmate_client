import { Link } from "react-router-dom";
import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { FaHeart, FaStar } from "react-icons/fa";

const PrePlannedTripCard = ({ id, type, name, price, duration, rating }) => {
  return (
    <Link to={`/pre-planned-trips/${id}`} style={{ textDecoration: "none" }}>
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
            src="https://picsum.photos/286/180"
            alt="Restaurant Image"
            style={{
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1), 0px -10px 20px rgba(255, 255, 255, 0.9)", // Uniform shadow
              borderRadius: "5px",
            }}
          />
          {/* <Button
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
          </Button> */}
        </div>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <div className="d-flex align-items-center mb-2">
            <FaStar style={{ color: "green" }} />
            <FaStar style={{ color: "green" }} />
            <FaStar style={{ color: "green" }} />
            <FaStar style={{ color: "green" }} />
            <FaStar style={{ color: "green" }} />
            <Badge bg="light" text="dark" className="ms-2">
            {Math.floor(Math.random() * 10) + 1} Reviews
            </Badge>
          </div>
          <Card.Text>${price} per person</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PrePlannedTripCard;
