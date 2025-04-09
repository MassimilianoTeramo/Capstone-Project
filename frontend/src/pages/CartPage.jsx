import React from "react";
import { useCart, useDispatchCart } from "../context/CartContext";
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";


const CartItem = ({ product, index, handleRemove }) => {
    const [products, setProducts] = useState([]);
    const { user } = useAuth();


  return (
    <article>
      <div className="dt w-100 bb b--black-10 pb2 mt2 dim blue" href="#0">
        <div className="dtc w3">
          <img src={product.image} className="db w-100" />
        </div>
        <div className="dtc v-top pl2">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">{product.title}</h1>
          <dl className="mt2 f6">
            <dt className="clip">Price</dt>
            <dd className="ml0">
              {product.price.toLocaleString("en", {
                style: "currency",
                currency: "GBP"
              })}
            </dd>
          </dl>
          <button onClick={() => handleRemove(index)}>Remove from cart</button>
        </div>
      </div>
    </article>
  );
};

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
    <Container className="mt-4 text-center">
        
        <div className="cart-header mb-4">
            <h2 className="text-center mb-4" style={{ color: "#333", fontWeight: "600" }}>Your Cart</h2>
            <div className="total-price-container p-3 mb-4" style={{ 
                backgroundColor: "#f8f9fa", 
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}>
                <h4 className="mb-0" style={{ color: "#2eff60", fontWeight: "700" }}>
                    Totale: {totalPrice.toLocaleString("en", {
                        style: "currency",
                        currency: "GBP"
                    })}
                </h4>
            </div>
        </div>
         <Row>
        <Col md={4}>
          <strong>Product Name</strong>
        </Col>
        <Col md={4}>
          <strong>Price</strong>
        </Col>
        <Col md={4}>
          <strong>Go to Details</strong>
        </Col>
      </Row>
        <div className="cart-items-container">
            <Row>
            {items.length > 0 ? (
                items.map((product, index) => (
                    <Row key={product._id} className="d-flex align-items-center mt-4">
              <Col className="mb-4">
                <Image src={product.image} style={{ width: "60%" }} />
              </Col>
              <Col md={4} className="mb-4">
                <p className="card_price">£ {product.price}</p>
              </Col>
              <Col className="mb-4"> 
                <Button
                    className="card_button"
                    onClick={() => navigate(`/products/${product._id}`)}
                >
              Dettagli
            </Button>
            </Col>
            </Row>
                ))
            ) : (
                <div className="text-center py-5" style={{ color: "#666" }}>
                    <h4>Il tuo carrello è vuoto</h4>
                    <p className="mb-0">Aggiungi alcuni prodotti per iniziare!</p>
                </div>
            )}
        </Row>
        </div>
    </Container>
  );
}