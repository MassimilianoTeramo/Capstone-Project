import React, {useRef, useMotionValue, useState} from "react";
import { Container, Row, Col, Pagination, Card, Button } from "react-bootstrap";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import bg1 from "../uploads/bg1.jpg";
import cardUsed from "../uploads/cardUsed.jpg";
import cardNU1 from "../uploads/cardNU1.jpg";
import {motion, AnimatePresence, useTransform, useSpring} from "framer-motion";
import {MouseEventHandler} from "react";


// Removed the incorrect useRef declaration here



const CardVariants = {
  initial: {
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
  },
  whileHover: {
    boxShadow: "0px 0px 28px gold",
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1
    },
  },
};

const DataVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  whileHover: {
    opacity: 1,
    y: -50,
    transition: {
      duration: 0.3,
    },
  },
};

const Home = () => {
  const Data = useRef(null); 

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);

  const handleMouseMove = (e, setState) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { clientWidth, clientHeight } = target;

    const x = (offsetX / clientWidth) - 0.5;
    const y = (offsetY / clientHeight) - 0.5;

    setState({ rotateX: y * 20, rotateY: x * 20, scale: 1.1 });
  };

  //ANIMATION NEW CARD

  const handleMouseEnter = (setState) => setState((prev) => ({ ...prev, scale: 1.1 }));
  const handleMouseLeave = (setState) => setState({ rotateX: 0, rotateY: 0, scale: 1 });


  const [card1State, setCard1State] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [card2State, setCard2State] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  //ANIMATION USED CARD

  const handleMouseMoveUsed = (e, setState) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { clientWidth, clientHeight } = target;

    const x = (offsetX / clientWidth) - 0.5;
    const y = (offsetY / clientHeight) - 0.5;

    setState({ rotateX: y * 20, rotateY: x * 20, scale: 1.1 });
  };

  const handleMouseEnterUsed = (setState) => setState((prev) => ({ ...prev, scale: 1.1 }));
  const handleMouseLeaveUsed = (setState) => setState({ rotateX: 0, rotateY: 0, scale: 1 });

  return (
    <>
      <section id="FirstSec" className="d-flex justify-content-between ">
        <Col className="noShowmd" lg={7}></Col>
        <Col lg={5} md={12} sm={12} className="herosection">
          <div className="carousel-content text-center mt-5">
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

        <section className="SectionCarousel">
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
            <Col md={6} lg={3} sm={12} className="d-flex justify-content-center">
              <motion.div
                variants={CardVariants}
                initial="initial"
                whileHover="whileHover"
               onMouseEnter={() => handleMouseEnter(setCard1State)}
               onMouseLeave={() => handleMouseLeave(setCard1State)}
               onMouseMove={(e) => handleMouseMove(e, setCard1State)}
               style={{
                 transformStyle: "preserve-3d",
                 perspective: "1000px",
                 transform: `rotateX(${card1State.rotateX}deg) rotateY(${card1State.rotateY}deg) scale(${card1State.scale})`,
               }}
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
                    width:"18rem"
                  }}
                >
                  <motion.div
                    variants={DataVariants}
                    className="card_New_data"
                  >
                    <p className="NUsec">Explore New Section</p>
                  </motion.div>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} lg={3} sm={12} className="d-flex justify-content-center">
            <motion.div
                variants={CardVariants}
                initial="initial"
                whileHover="whileHover"
               onMouseEnter={() => handleMouseEnterUsed(setCard2State)}
               onMouseLeave={() => handleMouseLeaveUsed(setCard2State)}
               onMouseMove={(e) => handleMouseMoveUsed(e, setCard2State)}
               style={{
                 transformStyle: "preserve-3d",
                 perspective: "1000px",
                 transform: `rotateX(${card2State.rotateX}deg) rotateY(${card2State.rotateY}deg) scale(${card2State.scale})`,
               }}
              >
                <Card 
                  className="cardNewUsed"
                  as={Link}
                  to={`/products/condition/used`}
                  style={{
                    backgroundImage: `url(${cardUsed})`,
                    backgroundSize:"cover",
                    backgroundRepeat:"no-repeat",
                    backgroundPosition:"center",
                  }}
                >
                  <motion.div
                    variants={DataVariants}
                    className="card_New_data"
                  >
                    <p className="NUsec">Explore Used Section</p>
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
