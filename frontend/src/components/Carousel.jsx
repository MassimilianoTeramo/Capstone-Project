import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import magliaCat from "../uploads/Tshirt-homePage.png";
import pantsCat from "../uploads/image1_0.jpg";
import shoesCat from "../uploads/shoes-categoria.png";
import socksCat from "../uploads/socksHomeP.jpg";
import ballsCat from "../uploads/bola.jpg";
import { motion } from "framer-motion";
import { Col, Card, Button, Container } from "react-bootstrap";

const slider = [
  {
    title: "shirts",
    description: "T-shirts",
    url: magliaCat,
  },
  {
    title: "pants",
    description: "Shorts",
    url: pantsCat,
  },
  {
    title: "shoes",
    description: "Shoes",
    url: shoesCat,
  },
  {
    title: "socks",
    description: "Socks",
    url: socksCat,
  },
  {
    title: "balls",
    description: "Balls",
    url: ballsCat,
  },
];

const Carousel = () => {
  return (
    <div className="carousel">
      <motion.h3
        initial={{ x: "-100vh" }}
        animate={{ x: 0 }}
        className="titleCategory text-center "
        transition={{
          duration: 3,
          type: "spring",
          stiffness: 50,
          mass: "2",
          dumpling: "10",
        }}
      >
        EXPLORE CATEGORIES
      </motion.h3>
      <Swiper
        className="myswiper ms-4"
        initialSlide={3}
        modules={[EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        speed={600}
        coverflowEffect={{
          rotate: 0,
          stretch: 1,
          depth: 100,
          modifier: 5,
          slideShadows: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView="auto"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          391: {
            slidesPerView: 1,
            
          },
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1560: {
            slidesPerView: 3,
          },
        }}
      >
        {slider.map((data, index) => (
          <SwiperSlide
            key={index}
            className="myswiper-slider mt-3 mb-3 text-center h-100"
          >
            <Col md={4} sm={12} lg={3} className="mb-4 ">
              <Card
                className="h-100 card-swiper shadow-sm"
                style={{
                  backgroundImage: `url(${data.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "5px solid rgb(255, 224, 46)",
                  width: "20rem",
                }}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Button
                    as={Link}
                    to={`/products/category/${data.title}`}
                    className="swiper_button"
                  >
                    Explore {data.title}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
