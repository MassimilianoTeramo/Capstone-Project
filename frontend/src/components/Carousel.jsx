import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import {Link} from "react-router-dom";
import magliaCat from '../uploads/maglia-categoria.png';
import pantsCat from '../uploads/pants-categoria.png';
import shoesCat from '../uploads/shoes-categoria.png';
import socksCat from '../uploads/socks-categoria.png';
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
            <a href="#" className="slider-btn">
              Shop Now
            </a>
          </div>
        </div>
        <Container className="mt-5">
          <h2 
          className="text-center title2sec mt-4"
          style={{fontSize:'25px', textAlign:'center'}}
          >Shop by Category</h2>
          <hr className="section-divider mt-3" />
          <Swiper
            className="myswiper"
            modules={[Pagination, EffectCoverflow, Autoplay]}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 7,
              slideShadows: true,
            }}
            loop={true}
            pagination={{ clickable: true }}
            slidesPerView={2}
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
              <SwiperSlide key={index} className="myswiper-slider mt-5 mb-5 text-center">
                <Col className="col-12 col-md-6 col-lg-3">
                  <Card className="h-100 card-swiper shadow-sm">
                    <Card.Img
                      variant="top"
                      src={data.url}
                      alt={data.title}
                      className="card-image"
                    />
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                      <Card.Title>
                        <h2 className="card-title">{data.description}</h2>
                      </Card.Title>
                      <Link to={`/products/category/${data.title}`} className="swiper_button mt-5 mx-auto">
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
