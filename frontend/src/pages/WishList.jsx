import { useState, useEffect } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-bootstrap";
import api from "../utils/api";
import { BiCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatchCart } from "../context/CartContext"; //carrello
import { useWish } from "../context/WishListContext";
import { useDispatchWish } from "../context/WishListContext";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import bgform2 from "../uploads/bgform2.jpg";

const WishList = () => {
  const dispatch = useDispatchCart(); //carrello
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const products = useWish();
  const navigate = useNavigate();
  const dispatchWish = useDispatchWish();
  const [showLabel, setShowLabel] = useState(false);

  //carrello
  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
  };

  const handleLike = async (id) => {
    if (!user) {
      return;
    }

    try {
      const response = await api.post(
        `${process.env.REACT_APP_API_URL}/wishlist/${id}`
      );

      await api
        .get(`${process.env.REACT_APP_API_URL}/wishlist`)
        .then((response) =>
          dispatchWish({ type: "UPDATE", items: response.data })
        )

        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Errore nel like:", error);
    }
  };

  return (
      <div
              style={{
                backgroundImage: `url(${bgform2})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundBlendMode: "darken",
                width: "auto",
                height: "100%",
                marginTop: "-10px",
              }}
            >
    <Container className="pt-5 mb-0 wishListContainer">
      <h3
        className="text-center text-warning"
        style={{ fontFamily: "Anek Odia", fontSize: "40px" }}
      >
        My Wish List
      </h3>
      <Row className="text-center py-5 noShowsm">
        <Col md={3}>
          <strong>Product</strong>
        </Col>
        <Col md={2}>
          <strong>Price</strong>
        </Col>
        <Col md={3}>
          <strong>Go to Details</strong>
        </Col>
      </Row>
      <Row className="pb-5">
        {products.length > 0 ? (
          products.map(
            (product) =>
              product && (
                <Row
                  key={product._id}
                  className="d-flex align-items-center text-center mt-4"
                >
                  <Col md={3} className="mb-4">
                    <Image src={product.image} style={{ width: "50%" }} />
                  </Col>
                  <Col md={2}>
                    <span className="card_price">
                      £ {product.price.toFixed(2)}
                    </span>
                  </Col>
                
                    <Col md={3} className="mb-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          className="card_button "
                          onClick={() => navigate(`/products/${product._id}`)}
                        >
                          Details
                        </Button>
                      </motion.div>
                    </Col>
                    <Col className="mb-3 d-flex justify-content-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          className="card_button align-items-center "
                          style={{
                            paddingLeft: "0.6rem",
                            width: "3rem",
                            borderRadius: "10%",
                          }}
                          onClick={() => addToCart(product)}
                        >
                          <BiCart size={24} />
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          className="card_button align-items-center"
                          style={{
                            width: "3rem",
                            borderRadius: "10%",
                            marginLeft: "1rem",
                            paddingLeft: "0.9rem",
                          }}
                          onClick={() => handleLike(product._id)}
                        >
                          <FaTrash />
                        </Button>
                      </motion.div>
                    </Col>
                  
                  <hr className="noShowlg" style={{width:"80%", margin:"10px auto", color:"gold"}}></hr>
                </Row>
              )
          )
        ) : (
          <Col>
            <p>Your wish list is empty!</p>
          </Col>
        )}
      </Row>
    </Container>
    </div>
  );
};

export default WishList;
