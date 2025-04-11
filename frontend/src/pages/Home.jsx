import { useState, useEffect } from "react";    
import { Container, Row, Col, Pagination, Card } from "react-bootstrap";  
import axios from "axios";
import Products from "./Products";
import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";
import {Link} from "react-router-dom";
import newCat from '../uploads/newCat.jpg';
import usedCat from '../uploads/usedCat.jpg';
import bg1 from '../uploads/bg1.jpg';


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
       <Container fluid className=""> 
          <section className="mt-5 d-flex flex-column align-items-center"> 
            <Carousel />
          </section>
          <section className="mt-5 d-flex flex-column align-items-center">
            <h2 className="mb-4 title" style={{fontSize:'35px', textAlign:'center'}}>New or Used?</h2>
            
            <hr className="section-divider mt-5" />
            
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


        <img src={bg1} alt="bg1" className='bg1' />
                </section>
        </Container>

      </>

    );
}
export default Home;
