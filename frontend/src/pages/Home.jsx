import { useState, useEffect, useLayoutEffect, useRef} from "react";
import { Container, Row, Col, Pagination, Card, Button } from "react-bootstrap";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import bg1 from "../uploads/bg1.jpg";
import cardUsed from "../uploads/cardUsed.jpg";
import cardNU1 from "../uploads/cardNU1.jpg";
import {motion} from "framer-motion";


const CardVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0px 0px 28px gold",
    transition: {
      repeat: 3, // Use 'repeat' instead of 'yoyo'
      repeatType: "reverse", // Ensures the animation reverses
      duration: 0.3 // Adjust duration as needed
    }
  }
}
 

const Home = () => {

  return (
    <>
      <section id="FirstSec" className="d-flex justify content between">
        <Col md={7}></Col>
        <Col md={5} sm={12} className="h-100">
          <div 
            className="carousel-content text-center mt-5 me-5">
            <motion.p 
              initial={{ y:'-200vw' }}
              animate={{ y: 0 }}
              transition={{delay:0.2, duration: 1, stiffness: 50, type:"spring"}}>
              For the real supporter
              </motion.p>

            <motion.h1 
              className="maintitle"
              initial={{y:'-200vw'}}
              animate={{y: 0}}
              transition={{delay:0.7, duration: 1, stiffness: 50, type:"spring"}}>
              Live Football, Wear Your Passion!
              </motion.h1>

            <motion.p 
              className="description mb-5"
              initial={{y:'-200vw'}}
              animate={{y: 0}}
              transition={{delay:1, duration: 1, stiffness: 50, type:"spring"}}>
              Find everything you need to play, support, and live football to
              the fullest. Fast shipping and guaranteed quality!
            </motion.p>
          </div>
        </Col>
      </section>

      <Container fluid>

        <section className="d-flex flex-column align-items-center">
          <Carousel />
        </section>

        <section id="NewUsed">
          <motion.h3
                 initial={{x:"-100vh"}}
                 animate={{ fontSize: "50px", x: 0 }}
                 transition={{duration: 3, type:"spring", stiffness: 50, mass:"2", dumpling:"10" }}
                 >
                   NEW OR USED?
               </motion.h3>

          <Row className="my-5 pb-3 d-flex justify-content-center w-100 ">
            <Col md={5} sm={12} className="d-flex justify-content-center">
            <motion.div
              variants={CardVariants}
              whileHover= "hover"         
              >
               <Card 
              className="cardNewUsed"
              as={Link}
              to={`/products/condition/new`}
              style={{
                backgroundImage: `url(${cardNU1})`,
                backgroundSize:"cover",
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center",
              }}
              >
              
                <motion.div
                  initial={{y:-100, visibility:"hidden"}}
                  animate={{ scale: 1.8, y:190, visibility:"visible"}}
                
                >
                  <p>Explore New Section</p>

                </motion.div>
                
               
              </Card>
            </motion.div>
             
            </Col>

            <Col md={5} sm={12} className="d-flex justify-content-center">
            <motion.div
              variants={CardVariants}
              whileHover= "hover"         
              >
               <Card 
              className="cardNewUsed"
              as={Link}
              to={`/products/condition/new`}
              style={{
                backgroundImage: `url(${cardUsed})`,
                backgroundSize:"cover",
                backgroundRepeat:"no-repeat",
                backgroundPosition:"center",
              }}
              >
              
                <motion.div
                  initial={{y:-100, visibility:"hidden"}}
                  animate={{ scale: 1.8, y:190, visibility:"visible"}}
                
                >
                  <p>Explore Used Section</p>

                </motion.div>
                
               
              </Card>
            </motion.div>
             
            </Col>
          </Row>
          <img src={bg1} alt="bg1" className="bg1" />
        </section>

      </Container>
    </>
  );
};
export default Home;


/* <div className="card_New_data">
                  <div
                    as={Link}
                    to={`/products/condition/new`}
                    className="bnNewUsed"
                  >
                    New products
                  </div>
                </div> */