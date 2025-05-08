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
                    padding: '60px 0'
                }}>
                <div className="container p-1">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="mt-3 mb-3">
                                <h1 style={{ marginBottom: "40px", fontSize: '3rem', color: '#C1EAF8' }}>
                                Travelers' Feedback
                                </h1>
                                <p style={{ fontSize: '1.2rem', color: '#C1EAF8', maxWidth: '700px', margin: '0 auto' }}>
                                See what travelers are saying. Whether it's a dream vacation or a weekend trip, let their feedback guide your journey
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "50px" }}>
                        <Swiper
                            spaceBetween={30}  // Increase spacing between slides for a more open layout
                            slidesPerView={3}  // Show 3 feedback cards at once
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            modules={[Autoplay]}
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
