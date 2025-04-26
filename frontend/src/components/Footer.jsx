import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaEnvelope, FaGithub} from 'react-icons/fa';
import { IoFootball } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="py-5">
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3 footer-first-title">
              <IoFootball className="footer-logo me-2" />
              <h5 className="footer-title mb-0">FootballShop</h5>
            </div>
            <p className="footer-text">
            Your one-stop store for all things soccer. 
            High quality clothing, shoes and accessories for all fans.
            </p>
          </Col>
          
          <Col md={4} className="footer-section mb-4 mb-md-0 text-center">
            <h5 className="footer-title mb-3">Link Utili</h5>
            <ul className="footer-links list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/create" className="footer-link">
                  Sell a product
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/myproducts" className="footer-link">
                  My Product
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/wishlist" className="footer-link">
                  Wish List
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col md={4} className="footer-section text-end">
            <h5 className="footer-title mb-3">Contacts</h5>
            <div className="d-flex justify-content-end align-items-center mb-3 footer-email">
              <FaEnvelope className="me-2" />
              <a href="mailto:maxtera87@gmail.com" className="footer-link">
                maxtera87@gmail.com
              </a>
            </div>
            <div className="social-links">
              <a 
                href="https://www.facebook.com/" 
                className="social-link me-3"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://www.instagram.com/" 
                className="social-link me-3"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://github.com/MassimilianoTeramo" 
                className="social-link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col className="text-center py-3 footer-bottom">
            <p className="mb-0">
              © {new Date().getFullYear()} FootballShop - Capstone Project Epicode
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
