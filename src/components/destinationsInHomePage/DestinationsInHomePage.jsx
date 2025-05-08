import React, { useContext } from 'react'
import DestinationCardComponent from '../destinationCardComponent/DestinationCardComponent';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import './DestinationsInHomePage.css'
import { ClientContext } from '../../context/ClientContext';

const DestinationsInHomePage = () => {
    const {allDestinations} = useContext(ClientContext);
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2 className="destinationsinhome-heading text-start" style={{ marginBottom: '1.5rem' }}>
                            Discover Destinations for Every Adventure
                        </h2>
                        <h6 style={{ marginBottom: '1.5rem', color: '#6c757d' }}>
                            Explore breathtaking locations and hidden gems, curated to make your travels unforgettable.                    </h6>
                    </Col>
                </Row>
            
                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    modules={[Autoplay]}
                    Navigation
                    loop={true}
                    autoplay={{ delay: 4000 }}
                    // pagination={{ clickable: true }}
                    style={{ paddingBottom: '2rem' }}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        }
                    }}>

                    {allDestinations.map((destinaion) => (
                        <SwiperSlide key={destinaion.id}>
                            <DestinationCardComponent
                             images={destinaion.images}
                            id={destinaion.id}
                            title={destinaion.name}
                            reviewCount= {Math.floor(Math.random() * 10) + 1}
                            category={destinaion.category.slice(0, 2).join(", ")}
                            city={destinaion.city}
                            miniDescription={destinaion.miniDescription}
                            >
                            </DestinationCardComponent>
                        </SwiperSlide>
                    ))}
                   
                </Swiper>
                
            </Container>

        </>
    );
}

export default DestinationsInHomePage