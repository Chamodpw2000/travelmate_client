import React, { useContext } from "react"; 
import "swiper/css/pagination";
import { Container, Row, Col } from "react-bootstrap";
import { ClientContext } from "../../context/ClientContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import RestaurantCard from "../prePlannedTripCard/PrePlannedTripCard.jsx";
import "./PrePlannedTripsInLandingPage.css";
import PrePlannedTripCard from "../prePlannedTripCard/PrePlannedTripCard.jsx";

const PrePlannedTripsInLandingPage = ({header}) => {
  const { allPrePlannedTrips } = useContext(ClientContext);
  

  return (
    <div className="pre-planned-trips-section">
      <Container style={{ padding: "2rem" }}>
        <Row>
          <Col>
            <h2
              className="pre-planned-trips-heading"
              style={{ textAlign: "center", marginBottom: "1.5rem" }}
            >
              {header}
            </h2>
          </Col>
        </Row>

        <Swiper
          spaceBetween={40}
          slidesPerView={3}
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 4000 }}
          // pagination={{ clickable: true }}
          style={{ paddingBottom: "2rem" }}
        >
          {allPrePlannedTrips.map((prePlannedTrip) => (
            <SwiperSlide key={prePlannedTrip.id}>
              <PrePlannedTripCard
                name={prePlannedTrip.name}
                price={prePlannedTrip.price}
                mainDestinations={prePlannedTrip.mainDestinations}
                guides={prePlannedTrip.guides}
                duration={prePlannedTrip.duration}
                noOfTravelers={prePlannedTrip.noOfTravelers}
                startTime={prePlannedTrip.startTime}
                startLocation={prePlannedTrip.startLocation}
                endTime={prePlannedTrip.endTime}
                endLocation={prePlannedTrip.endLocation}
                description={prePlannedTrip.description}
                availableDates={prePlannedTrip.availableDates}
                contactNumber={prePlannedTrip.contactNumber}
                rating={prePlannedTrip.rating}
                // imageSrc={prePlannedTrip.cardImage}
                id={prePlannedTrip.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default PrePlannedTripsInLandingPage;
