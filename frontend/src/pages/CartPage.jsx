import React from "react";
import { useCart, useDispatchCart } from "../context/CartContext";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { motion } from "framer-motion";
import bgCart from "../uploads/bgcart.jpg";

const buttonVariants = {
  whileHover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
  whileTap: {
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export default function Store() {
  const items = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const tax = 0.2;
  const expedition = 16;
  const totalPrice =
    items.reduce((total, item) => total + item.price * item.quantity, 0) *
      (1 + tax) +
    expedition;

  const handleRemove = (productId) => {
    try {
      dispatch({
        type: "REMOVE",
        payload: { id: productId },
      });
    } catch (error) {
      console.error("Errore durante la rimozione del prodotto:", error);
    }
  };

  const handleQuantityChange = (productId, change) => {
    try {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, change },
      });
    } catch (error) {
      console.error("Errore durante l'aggiornamento della quantità:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgCart})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        width: "auto",
        minHeight: "35rem",
        marginTop: "-10px",
      }}
      className="py-5"
    >
      <Container className="mt-4 d-flex flex-column">
        <div className="mb-4">
          <h3
            className="text-center mb-4 text-warning"
            style={{ fontFamily: "Anek Odia", fontSize: "40px" }}
          >
            Your Cart
          </h3>
          <hr className="section-divider mt-3 w-100 noShowsm" />
        </div>
        <div className="d-flex flex-row containerCart">
          <Col md={8} sm={12}>
            {items.length > 0 ? (
              items.map((product) => (
                <div key={product._id}>
                  <Row className="d-flex align-items-center mt-4">
                    <Col md={3} className="titleCartsm">
                      <Image src={product.image} style={{ width: "60%" }} />
                    </Col>
                    <Col md={3} className="mb-4 ">
                      <h4 className="mb-3" style={{ color: "#ffd22e" }}>
                        {product.title}
                      </h4>
                      <div className="detailsCardsm">
                        <p style={{ color: "white" }}>
                          Price:
                          <span className="card_price my-0 mx-1">
                            £ {product.price.toFixed(2)}
                          </span>
                        </p>
                        <p style={{ color: "white" }}>
                          Size:
                          <span className="card_price my-0 mx-1">
                            {product.size}
                          </span>
                        </p>
                        <p style={{ color: "white" }}>
                          Gender:
                          <span className="card_price my-0 mx-1">
                            {product.gender}
                          </span>
                        </p>
                      </div>
                      <div className="d-flex align-items-center mt-2 btnQuantity ">
                        <motion.div
                          variants={buttonVariants}
                          whileHover="whileHover"
                          whileTap="whileTap"
                        >
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                              handleQuantityChange(product._id, -1)
                            }
                            disabled={product.quantity <= 1}
                          >
                            <FaMinus />
                          </Button>
                        </motion.div>
                        <span className="mx-2" style={{ color: "white" }}>
                          {product.quantity}
                        </span>
                        <motion.div
                          variants={buttonVariants}
                          whileHover="whileHover"
                          whileTap="whileTap"
                        >
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleQuantityChange(product._id, 1)}
                          >
                            <FaPlus />
                          </Button>
                        </motion.div>
                      </div>
                    </Col>
                    <div className="btnDetTrash col-md-3 d-flex justify-content-center gap-5">
                      <Col md={3}>
                        <motion.div
                          className="d-flex justify-content-center"
                          variants={buttonVariants}
                          whileHover="whileHover"
                          whileTap="whileTap"
                        >
                          <Button
                            variant="warning"
                            onClick={() => navigate(`/products/${product._id}`)}
                          >
                            Details
                          </Button>
                        </motion.div>
                      </Col>
                      <Col md={3}>
                        <motion.div
                          className="d-flex justify-content-center"
                          variants={buttonVariants}
                          whileHover="whileHover"
                          whileTap="whileTap"
                        >
                          <Button
                            variant="warning"
                            onClick={() => handleRemove(product._id)}
                          >
                            <FaTrash />
                          </Button>
                        </motion.div>
                      </Col>
                    </div>
                  </Row>
                  <hr style={{ color: "gold" }} />
                </div>
              ))
            ) : (
              <div className="text-center py-5" style={{ color: "#666" }}>
                <h4 className="ms-2 text-warning mb-3">Your cart is empty!</h4>
              </div>
            )}
          </Col>
          <Col md={4} sm={12} className="ms-3 stickyBox">
            <h4 className="ms-2 text-warning mb-3">Cart Details</h4>
            <div id="listaCart">
              <div className="d-flex justify-content-between">
                <span>Sales Taxes:</span>
                <span> 20%</span>
              </div>
              <div className="d-flex justify-content-between">
                Use Voucher: <input></input>
              </div>
              <div className="d-flex justify-content-between">
                Shipping costs:<span> £ 16.00</span>
              </div>
            </div>
            <div
              className="total-price-container p-3 mb-4"
              style={{
                backgroundColor: "black",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h4 className="mb-0 text-warning">
                Totale:
                {totalPrice.toLocaleString("en", {
                  style: "currency",
                  currency: "GBP",
                })}
              </h4>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
}
