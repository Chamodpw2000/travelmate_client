import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { ClientContext } from "../../context/ClientContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./RestaurantsInLandingPage.css";

const RestaurantsInLandingPage = () => {
  const { allRestaurants } = useContext(ClientContext);

  return (
    <div className="restaurants-section">
      <Container style={{ padding: "2rem" }}>
        <Row>
          <Col>
            <h2
              className="restaurants-heading"
              style={{ textAlign: "center", marginBottom: "1.5rem" }}
            >
              Restaurants
            </h2>
          </Col>
        </Row>

        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 4000 }}
          // pagination={{ clickable: true }}
          style={{ paddingBottom: "2rem" }}
        >
          {allRestaurants.map((restaurant) => (
            <SwiperSlide key={restaurant.id}>
              <RestaurantCard
                name={restaurant.name}
                restaurantName={restaurant.restaurantName}
                address={restaurant.address}
                category={restaurant.category}
                contactNumber={restaurant.contactNumber}
                description={restaurant.description}
                email={restaurant.email}
                website={restaurant.website}
                openingHours={restaurant.openingHours}
                rating={restaurant.rating}
                priceRange={restaurant.priceRange}
                // imageSrc={restaurant.cardImage}
                id={restaurant.id}
                mainCategory={restaurant.mainCategory}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default RestaurantsInLandingPage;
