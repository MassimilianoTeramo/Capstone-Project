import { useState, useEffect } from "react";
import { Container, Row, Col, Pagination, Card } from "react-bootstrap";
import axios from "axios";
import Products from "./Products";
import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import newCat from "../uploads/newCat.jpg";
import usedCat from "../uploads/usedCat.jpg";
import bg1 from "../uploads/bg1.jpg";

const Home = () => {

  return (
    <>
      <section id="FirstSec" className="d-flex justify content between">
        <Col md={7}></Col>
        <Col md={5} sm={12} className="h-100">
          <div className="carousel-content text-center mt-5 me-5">
            <span className="carousel-tagline">For the real supporter</span>
            <h1 className="carousel-title">
              Live Football, Wear Your Passion!
            </h1>
            <p className="carousel-description mb-5">
              Find everything you need to play, support, and live football to
              the fullest. Fast shipping and guaranteed quality!
            </p>
          </div>
        </Col>
      </section>
      <Container fluid>
        <section className="d-flex flex-column align-items-center">
          <Carousel />
        </section>
        <section id="NewUsed" className="mt-2 d-flex flex-column align-items-center">
          <h3 className="mb-4"> NEW OR USED?</h3>
        
          <div className="mb-4 mt-3 d-flex justify-content-center w-100" style={{position: "relative"}}>

              <Col md={6} className="CardNew"
                  style={{
                    backgroundImage: `url(${newCat})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center -120px",
                    height: "25rem",
                    width:"50%",
                    marginLeft:"2rem",
                    marginRight:"-1rem",
                  }}>
                  <Link
                    to={`/products/condition/new`}
                    className="swiper_button"
                  >
                    Go to New products
                  </Link>
              </Col>
              <div className="banner"
              ></div>
              <Col md={6} className="CardUsed"
                  style={{
                    backgroundImage: `url(${usedCat})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center -220px",
                    height: "25rem",
                    width:"50%",
                    marginRight:"2rem",
                    marginLeft:"-1rem",
                  }}>
                  <Link
                    to={`/products/condition/new`}
                    className="swiper_button"
                  >
                    Go to Used products
                  </Link>
              </Col>
          </div>

          <img src={bg1} alt="bg1" className="bg1" />
        </section>
      </Container>
    </>
  );
};
export default Home;
