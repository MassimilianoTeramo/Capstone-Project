import { useState, useEffect } from "react";
import { Container, Row, Col, Pagination, Card, Button } from "react-bootstrap";
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
            <h1 className="maintitle">
              Live Football, Wear Your Passion!
            </h1>
            <p className="description mb-5">
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
        <section
          id="NewUsed">
          <h3 className="mt-4"> NEW OR USED?</h3>

          <Row className="my-5 pb-3 d-flex justify-content-center w-100 ">
            <Col md={5} sm={12} className="d-flex justify-content-center">
              <Card className="cardNew">
                <Card.Body>
                   <Button as={Link} to={`/products/condition/new`} className="btnNewUsed">
                    Go to New products
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5} className="d-flex justify-content-center">
              <Card  className="cardUsed">
                <Card.Body>
                  <Button as={Link} to={`/products/condition/used`}className="btnNewUsed">
                    Go to used products
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <img src={bg1} alt="bg1" className="bg1" />
        </section>
      </Container>
    </>
  );
};
export default Home;
