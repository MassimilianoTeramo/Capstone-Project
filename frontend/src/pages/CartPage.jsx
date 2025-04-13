import React from "react";
import { useCart, useDispatchCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";

export default function Store() {
  const items = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const totalPrice = items.reduce((total, b) => total + b.price, 0);

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  if (items.length === 0) {
    return (
      <main>
        <p>Cart is empty</p>
      </main>
    );
  }
  return (
    <Container className="mt-4 d-flex flex-column">
      <div className="mb-4">
        <h3 className="text-center mb-4 title">Your Cart</h3>
        <hr className="section-divider mt-3 w-100" />
      </div>
      <div className="d-flex flex-horizontal">
      <Col md={8}>
        {items.length > 0 ? (
          items.map((product) => (
            <Row key={product._id} className="d-flex align-items-center mt-4">
              <Col md={4}>
                <Image src={product.image} style={{ width: "60%" }} />
              </Col>
              <Col md={4} className="mb-4">
                <h4 className="mb-3" style={{color:"#ffd22e"}}>{product.title.toUpperCase()}</h4>
                <p style={{color:"white"}}>Price: <span className="card_price my-0 mx-1">£ {product.price}</span></p>
                <p style={{color:"white"}}> Size: <span className="card_price my-0 mx-1">{product.size}</span> </p>
                <p style={{color:"white"}}> Gender: <span className="card_price my-0 mx-1">{product.gender}</span></p>
              </Col>
              <Col md={4}>
               
              </Col>
              
             
            </Row>
            
          ))
        ) : (
          <div className="text-center py-5" style={{ color: "#666" }}>
            <h4>Il tuo carrello è vuoto</h4>
            <p className="mb-0">Aggiungi alcuni prodotti per iniziare!</p>
          </div>
        )}
      </Col>
      <Col md={4}>
        <div>
          
          
        </div>
              <div
                  className="total-price-container p-3 mb-4"
                  style={{
                    backgroundColor: "black",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <h4 className="mb-0">
                    Totale:{" "}
                    {totalPrice.toLocaleString("en", {
                      style: "currency",
                      currency: "GBP",
                    })}
                  </h4>
                </div>
              </Col>
      </div>
    </Container>
  );
}
