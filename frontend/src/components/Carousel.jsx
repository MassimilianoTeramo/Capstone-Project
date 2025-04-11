import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import {Link} from "react-router-dom";
import magliaCat from '../uploads/Tshirt-homePage.png';
import pantsCat from '../uploads/shorts1.png';
import shoesCat from '../uploads/shoes-categoria.png';
import socksCat from '../uploads/socksCat.jpeg';
import ballsCat from '../uploads/ballsCat.png';

import {Col, Card, Button, Container} from 'react-bootstrap';


const slider = [
    {
        title: "shirts",
        description: "T-shirts",
       url: magliaCat
    },
    {
        title: "pants",
        description: "Shorts",
        url: pantsCat
    },
    {
        title: "shoes",
        description: "Shoes",
        url: shoesCat
    },
    {
        title: "socks",
        description: "Socks",
        url: socksCat
    },
    {
      title: "balls",
      description: "Balls",
      url: ballsCat
  },
   
]

const Carousel = ()=>{
    return (
      <div className="carousel mt-5">
      <div className="carousel-header">
        <div className="carousel-content text-center">
        <span className="carousel-tagline">For the real supporter</span>
        <h1 className="carousel-title">Live Football, Wear Your Passion!</h1>
        <hr className="carousel-divider" />
        <p className="carousel-description">
          Find everything you need to play, support, and live football to
          the fullest. Fast shipping and guaranteed quality!
        </p>
        </div>
      </div>
      <Container className="mt-5">
        <h2 
        className="text-center title mt-4 mb-3"
        style={{fontSize:'35px', textAlign:'center'}}
        >Shop by Category</h2>
        <hr className="section-divider mt-5" />
        <Swiper
        className="myswiper"
        initialSlide={3}
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        speed={600}
        coverflowEffect={{
          rotate: 0,
          stretch: 5,
          depth: 100,
          modifier: 7,
          slideShadows: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView="auto"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
          slidesPerView: 2,
          },
          768: {
          slidesPerView: 1,
          },
          1024: {
          slidesPerView: 2,
          },
          1560: {
          slidesPerView: 3,
          },
        }}
        >
        {slider.map((data, index) => (
          <SwiperSlide key={index} className="myswiper-slider mt-3 mb-3 text-center h-100">
          <Col className="col-12 col-md-6 col-lg-3">
            <Card 
            className="h-100 card-swiper shadow-sm" 
            style={{
              backgroundImage: `url(${data.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "40rem",
              border: "1px solid #2eff60",
              transition: "transform 0.3s ease",
            }}
            >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Link 
              to={`/products/category/${data.title}`} 
              className="swiper_button mt-5 mx-auto"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "5px",
                textDecoration: "none",
                transition: "all 0.3s ease",
                position:"absolute",
                bottom:"10px",
                right: "15px",
              }}
             
              >
              Explore {data.title}
              </Link>
            </Card.Body>
            </Card>
          </Col>
          </SwiperSlide>
        ))}
        </Swiper>


      </Container>


      </div>
    );
}

export default Carousel;
