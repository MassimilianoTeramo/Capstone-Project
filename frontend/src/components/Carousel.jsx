import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import imgBg from '../uploads/football.bg2.jpg';



const slider = [
    {
        title: "BackGround 1",
        description: "BackGround1",
       imgBg
    },
    {
        title: "BackGround 2",
        Description: "BackGround2",
        url:"/uploads/football.bg2.jpg",
    },
    {
        title: "BackGround 2",
        Description: "BackGround2",
        url:"/uploads/logo.epicode.png",
    },
]

const Carousel = ()=>{
    return (
        <div className="carousel">
            <div>
                <div className="carousel-content">
                    <span>For the real supporter</span>
                    <h1>Live Football, Wear Your Passion!</h1>
                    <hr />
                    <p>Find everything you need to play, support, and live football to the fullest. Fast shipping and guaranteed quality!</p>
                    <a href="#" className="slider-btn">Shop Now</a>
                </div>
            </div>
             
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
                    modifier: 4,
                    slideShadows: true
                }}
                loop={true}
                pagination={{clickable: true}}
                slidesPerView={2}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction:false
                }}
                breakpoints={{
                    640: {
                        slidesPerView:2
                    },
                    768: {
                        slidesPerView:1
                    },
                    1024: {
                        slidesPerView:2
                    },
                    1560: {
                        slidesPerView:3
                    },
                }}
                >
                {
                   slider.map((data, index) => (
                    <SwiperSlide 
                        key={index} 
                        style={{backgroundImage: `url(${data.url})`}} 
                        className="myswiper-slider"
                    >
                        <div>
                            <h2>{data.title}</h2>
                            <p>{data.description}</p>
                            <a href={`${data.url}`} target="_blank" rel="noopener noreferrer" className="slider-btn">Explore</a> 
                        </div>
                    </SwiperSlide>
                   )) 
                }
            </Swiper>
        </div>
    )
}

export default Carousel;