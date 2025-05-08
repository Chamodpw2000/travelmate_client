import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import "swiper/css/navigation"
import GuideCard from '../GuideCard/GuideCard';

const GetYourGuid = () => {

    const guides = [
        {
          id: 1,
          name: 'Nimendra Gunawardana',
          age: 26,
          description: 'Short Description about experience',
          area: 'UHDIJ',
          languages: 'UHDIJ',
          chargesPerDay: '5000',
          profileImg: 'https://picsum.photos/150', 
        },
        {
          id: 2,
          name: 'Nimendra Gunawardana',
          age: 26,
          description: 'Short Description about experience',
          area: 'UHDIJ',
          languages: 'UHDIJ',
          chargesPerDay: '5000',
          profileImg: 'https://picsum.photos/150', 
        },
        {
          id: 3,
          name: 'Nimendra Gunawardana',
          age: 26,
          description: 'Short Description about experience',
          area: 'UHDIJ',
          languages: 'UHDIJ',
          chargesPerDay: '5000',
          profileImg: 'https://picsum.photos/150', 
        },
        {
          id: 4,
          name: 'Nimendra Gunawardana',
          age: 26,
          description: 'Short Description about experience',
          area: 'UHDIJ',
          languages: 'UHDIJ',
          chargesPerDay: '5000',
          profileImg: 'https://picsum.photos/150', 
        },
        {
          id: 5,
          name: 'Nimendra Gunawardana',
          age: 26,
          description: 'Short Description about experience',
          area: 'UHDIJ',
          languages: 'UHDIJ',
          chargesPerDay: '5000',
          profileImg: 'https://picsum.photos/150',
        },
        {
            id: 6,
            name: 'Nimendra Gunawardana',
            age: 26,
            description: 'Short Description about experience',
            area: 'UHDIJ',
            languages: 'UHDIJ',
            chargesPerDay: '5000',
            profileImg: 'https://picsum.photos/150', 
          }
      ];


  return (
<div>

<div className='py-5' 



            >


                <h4 style={{ marginLeft: "90px", marginBottom: "50px", color: "#0A2E41", fontWeight: "bold" }}>Get Your Guid</h4>

                <h5 style={{ color: "#7094A7", marginLeft: "90px", marginBottom: "50px", color: "#0A2E41", fontWeight: "bold" }}>Get Guids Nearby</h5>

                <div>
                    <Swiper
                        spaceBetween={5}
                        modules={[Navigation]}
                        navigation
                        loop={true}
                        breakpoints={{
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 1, // Small screens
                            },
                            // when window width is >= 768px
                            850: {
                                slidesPerView: 2, // Medium screens
                            },
                            // when window width is >= 1024px
                            1500: {
                                slidesPerView: 3, // Large screens
                            },
                        }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {guides.map((guide, index) => (
                            <SwiperSlide key={index}>
                                <div className="d-flex justify-content-center">
                                    <GuideCard
                                         name={guide.name}
                                         age={guide.age}
                                         description={guide.description}
                                         area={guide.area}
                                         languages={guide.languages}
                                         chargesPerDay={guide.chargesPerDay}
                                         profileImg={guide.profileImg}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>







            </div>



    </div>
  )
}

export default GetYourGuid