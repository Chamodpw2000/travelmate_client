import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import VillaCard from "../VillaCard/VillaCard";
import { ClientContext } from "../../context/ClientContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const VillasInLandingPage = () => {
  const { allVillas } = useContext(ClientContext);

  // Filter only approved villas for public display
  const approvedVillas = allVillas?.filter(villa => villa.isApprovedByAdmin === true) || [];

  if (approvedVillas.length === 0) {
    return null;
  }

  return (
    <div className="restaurants-section">
      <Container style={{ padding: "2rem" }}>
        <Row>
          <Col>
            <h2
              className="restaurants-heading"
              style={{ textAlign: "center", marginBottom: "1.5rem" }}
            >
              Villas
            </h2>
          </Col>
        </Row>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 4000 }}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 15
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }}
          style={{ paddingBottom: "2rem" }}
        >
          {approvedVillas.map((villa) => (
            <SwiperSlide key={villa.id}>
              <VillaCard
                name={villa.name}
                address={villa.address}
                amenities={villa.amenities}
                contactNumber={villa.contactNumber}
                description={villa.description}
                email={villa.email}
                website={villa.website}
                checkInOut={villa.checkInOut}
                rating={villa.rating}
                priceRange={villa.priceRange}
                id={villa.id}
                propertyType={villa.propertyType}
                images={villa.images}
                miniDescription={villa.miniDescription}
                bedrooms={villa.bedrooms}
                bathrooms={villa.bathrooms}
                maxGuests={villa.maxGuests}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default VillasInLandingPage;