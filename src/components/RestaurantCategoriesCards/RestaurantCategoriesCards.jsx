import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './RestaurantCategoriesCards.css'
import RestaurantCategoryCard from '../RestaurantCategoryCard/RestaurantCategoryCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import casual from '/casualdining.jpg'
import daynight from '/daynight.jpg'
import veg from '/veg.jpg'
import outside from '/outside.jpg'
import fine from '/finedining.jpg'


const RestaurantCategoriesCards = () => {

    let categories = [{name:"Casual Dining",image:casual}, {name:"Fine Dining",image:fine}, {name:"Day Night", image:daynight}, {name:"Vegan & Veg", image:veg}, {name:"Outside", image:outside}];

    return (
        <Container style={{ padding: '2rem' }}>
            <Row>
                <Col>
                    <h2 className="restaurants-heading text-start" style={{ marginBottom: '1.5rem' }}>
                        Restaurant Categories for Every Occasion
                    </h2>
                    <h6 style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
                        Explore unique dining experiences across various categories, curated just for you.
                    </h6>
                </Col>
            </Row>

            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                modules={[Autoplay]}
                Navigation
                // loop={true}
                autoplay={{ delay: 4000 }}
                // pagination={{ clickable: true }}
                style={{ paddingBottom: '2rem' }}
            >
                {categories.map((category) => (
                    <SwiperSlide>
                        <RestaurantCategoryCard category={category} />
                    </SwiperSlide>
                ))}


            </Swiper>

        </Container>
        // <RestaurantCategoryCard/>
    )
}

export default RestaurantCategoriesCards