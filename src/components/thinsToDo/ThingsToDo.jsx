import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import HotelCard from '../HotelCard/HotelCard';
import "swiper/css/navigation"
import { ClientContext } from '../../context/ClientContext'






const ThingsToDo = () => {


    const { allAccommodations } = useContext(ClientContext);


    const hotelData = [
        {
            name: "Ocean View Hotel",
            description: "Beautiful oceanfront hotel with great views.",
            price: "$120 per night"
        },
        {
            name: "Mountain Retreat",
            description: "Cozy mountain lodge with hiking trails nearby.",
            price: "$150 per night"
        },
        {
            name: "City Lights Hotel",
            description: "Downtown hotel with modern amenities and .",
            price: "$200 per night"
        },
        {
            name: "Desert Oasis",
            description: "Luxurious hotel in the middle of the desert.",
            price: "$180 per night"
        },
        {
            name: "Lake House",
            description: "Charming lakeside inn with stunning views.",
            price: "$100 per night"
        }
    ];


    return (
        <div>

            <div



            >


                <h4 style={{ marginLeft: "90px", marginBottom: "50px", color: "#0A2E41", fontWeight: "bold" }}>Things To Do</h4>

                <h5 style={{ color: "#7094A7", marginLeft: "90px", marginBottom: "50px", color: "#0A2E41", fontWeight: "bold" }}>Attractions</h5>

                <div>
                <Swiper
        spaceBetween={30} 
        slidesPerView={3}
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 3000 }}
        // pagination={{ clickable: true }}
        style={{ paddingBottom: '2rem' }} 
      >
        {allAccommodations.map((accommodation) => (
          <SwiperSlide key={accommodation.id}>
            <HotelCard
              name={accommodation.name}
              description={accommodation.minidescription}
              price={accommodation.perPerson_price}
              imageSrc={accommodation.cardImage}
              id={accommodation.id}
              minidescription={accommodation.minidescription}
            />
          </SwiperSlide>
        ))}
      </Swiper>
                </div>







            </div>

        </div>
    )
}

export default ThingsToDo