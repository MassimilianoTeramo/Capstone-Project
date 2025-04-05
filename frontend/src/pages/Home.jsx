import { useState, useEffect } from "react";    
import { Container, Row, Col, Pagination } from "react-bootstrap";  
import axios from "axios";
import Products from "./Products";
import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  

    return (
      <>
       <Container fluid className="mt-5 d-flex flex-column align-items-center">  
            <Carousel />

        </Container>

      </>

    );
}
export default Home;
