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
          slidesPerView={1}
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 4000 }}
          // pagination={{ clickable: true }}
          breakpoints={{
            // when window width is >= 480px (mobile)
            480: {
              slidesPerView: 1,
              spaceBetween: 15
            },
            // when window width is >= 640px (small tablets)
            640: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 768px (tablets)
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            // when window width is >= 1024px (small desktop)
            1024: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            // when window width is >= 1280px (large desktop)
            1400: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }}
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
                images={restaurant.images}
                miniDescription={restaurant.miniDescription}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default RestaurantsInLandingPage;
