import { useState, useEffect } from "react";    
import { Container, Row, Col, Pagination, Card } from "react-bootstrap";  
import axios from "axios";
import Products from "./Products";
import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";
import {Link} from "react-router-dom";
import newCat from '../uploads/newCat.jpg';
import usedCat from '../uploads/usedCat.jpg';

const Home = () => {

  const imgMenu = [
    { 
       title: "new",
              description: "new",
             url: newCat
     },
     { 
      title: "used",
             description: "used",
            url: usedCat
    },
    
  ]
  

    return (
      <>
       <Container fluid > 
          <section className="mt-5 d-flex flex-column align-items-center"> 
            <Carousel />
          </section>
          <section className="mt-5 d-flex flex-column align-items-center">
            <h4 className="mt-5 mb-4 title2sec" style={{fontSize:'25px', textAlign:'center'}}>New or Used?</h4>
            <div className="mb-4 d-flex justify-content-between container-fluid">
              {imgMenu.map((data, index) => (
                  <Card 
                    key={index}
                    className="mx-5 my-5 card-swiper shadow-sm"
                    style={{ 
                      backgroundImage: `url(${data.url})`, 
                      backgroundSize: 'cover', 
                      backgroundPosition: 'center', 
                      borderRadius: '10px',
                      width: '30%',
                      margin: '0 auto',
                      height: '20rem', 
                    }}>
                      <Link 
                        to={`/products/condition/${data.title}`} 
                        className="swiper_button"
                        style={{position:'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', color:'white', fontSize:'20px'}}
                        >
                        Go to {data.description} products
                      </Link>
                 
                  </Card>
              ))}
            </div>
                </section>
        </Container>

      </>

    );
}
export default Home;
