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
      <Container style={{ padding: "2rem" }} className="">
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
          slidesPerView={1}
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 4000 }}
          // pagination={{ clickable: true }}
          breakpoints={{
            // when window width is >= 480px (mobile)
            480: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 640px (small tablets)
            640: {
              slidesPerView: 1,
              spaceBetween: 30
            },
            // when window width is >= 768px (tablets)
            768: {
              slidesPerView: 1,
              spaceBetween: 30
            },
            // when window width is >= 1024px (small desktop)
            1024: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            // when window width is >= 1280px (large desktop)
            1280: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }}
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
                          mainImage={prePlannedTrip.mainImage}

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
