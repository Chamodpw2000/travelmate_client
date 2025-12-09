import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FeedbackCard from '../FeedbackCard/FeedbackCard';
import { ClientContext } from '../../context/ClientContext';
import axios from 'axios';

const FeedbackSection = () => {
    const {allTravelMateFeedback} = useContext(ClientContext);
    console.log(allTravelMateFeedback);

    return (
        <section>
            <div className="section text-white"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(https://picsum.photos/1920/1080)',
                    padding: '60px 20px'
                }}>
                <div className="container p-1">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="mt-3 mb-3">
                                <h1 style={{ marginBottom: "40px", fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#C1EAF8' }}>
                                Travelers' Feedback
                                </h1>
                                <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#C1EAF8', maxWidth: '700px', margin: '0 auto', padding: '0 15px' }}>
                                See what travelers are saying. Whether it's a dream vacation or a weekend trip, let their feedback guide your journey
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "50px" }}>
                        <Swiper
                            spaceBetween={30}  // Increase spacing between slides for a more open layout
                            slidesPerView={1}  // Show 1 feedback card by default
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            modules={[Autoplay]}
                            breakpoints={{
                                // when window width is >= 480px (mobile)
                                480: {
                                    slidesPerView: 1,
                                    spaceBetween: 20
                                },
                                // when window width is >= 640px (small tablets)
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 25
                                },
                                // when window width is >= 768px (tablets)
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 25
                                },
                                // when window width is >= 1024px (small desktop)
                                1024: {
                                    slidesPerView: 2,
                                    spaceBetween: 30
                                },
                                // when window width is >= 1280px (large desktop)
                                1280: {
                                    slidesPerView: 3,
                                    spaceBetween: 30
                                }
                            }}
                            style={{ paddingBottom: '3rem' }}
                        >
                            {allTravelMateFeedback.map((feedback, i) => (
                                <SwiperSlide key={i} style={{ width: 'auto' }}>
                                    <FeedbackCard country={feedback.country} name={feedback.name} message={feedback.feedback} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeedbackSection;
