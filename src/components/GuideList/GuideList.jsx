import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GuideCard from '../GuideCard/GuideCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GuideList.css';
import { ClientContext } from '../../context/ClientContext';
import { useNavigate } from 'react-router-dom';

const GuideList = () => {



  const {allGuides} = useContext(ClientContext);

  const navigator = useNavigate();

 

  return (
    <div className="guides-section">
      <Container style={{ paddingTop: '5rem', paddingBottom: '5rem' , backgroundColor: '#f8f9fa' }}>
        <Row>
          <Col>
            <h2 className="guides-heading" style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
              Guides
            </h2>
          </Col>
        </Row>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 3000 }}
          // pagination={{ clickable: true }}
          style={{ paddingBottom: '5rem' }}
        >

          {allGuides.map((guide) => (
            <SwiperSlide key={guide.id}>
              <GuideCard
                name={guide.name}
                description={guide.description}
                area={guide.area[0]}
                languages={guide.languages[0]}
                chargesPerDay={guide.chargesPerDay}
                cardImage={guide.cardImage}
                id = {guide.id}
                image = {guide.images[0]}
                miniDescription = {guide.miniDescription}
              />

              


            </SwiperSlide>

            
          ))}
        </Swiper>

        <button className="view-all-button view-btn  " onClick={()=>{navigator("/allguides")}}>Book a Guide</button>


      </Container>
    </div>
  );
};

export default GuideList;
