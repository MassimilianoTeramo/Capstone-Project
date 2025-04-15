import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaEnvelope} from 'react-icons/fa';
import { IoFootball } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="py-5">
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <IoFootball className="footer-logo me-2" />
              <h5 className="footer-title mb-0">FootballShop</h5>
            </div>
            <p className="footer-text">
              Il tuo negozio di fiducia per tutto ciò che riguarda il calcio. 
              Abbigliamento, scarpe e accessori di alta qualità per tutti gli appassionati.
            </p>
          </Col>
          
          <Col md={4} className="footer-section mb-4 mb-md-0">
            <h5 className="footer-title mb-3">Link Utili</h5>
            <ul className="footer-links list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products/create" className="footer-link">
                  Vendi un Prodotto
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/myproducts" className="footer-link">
                  I Miei Prodotti
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/wishlist" className="footer-link">
                  Lista Desideri
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col md={4} className="footer-section">
            <h5 className="footer-title mb-3">Contatti</h5>
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-2" />
              <a href="mailto:maxtera87@gmail.com" className="footer-link">
                maxtera87@gmail.com
              </a>
            </div>
            <div className="social-links">
              <a 
                href="#" 
                className="social-link me-3"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="#" 
                className="social-link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
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
