import { useState, useEffect } from "react";    
import { Container, Row, Col, Pagination } from "react-bootstrap";  
import axios from "axios";
import Products from "./Products";
import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  

    return (
      <>
   <Carousel />
   <Container className="mt-5">
      <h2 className="title2sec">Best Seller</h2>
             
        </Container>

      </>

    );
}
export default Home;


/* <Row className="justify-content-center">
            <Col md={8}>
                <h1 className="text-center">Welcome to EpiBlog</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error loading posts: {error.message}</p>}
                {!loading && !error && (
                    <>
                        <Products products={products} />
                        <Pagination className="justify-content-center mt-4">
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </>
                )}
            </Col>
        </Row>*/