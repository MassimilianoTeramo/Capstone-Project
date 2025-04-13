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

const WishList = () => {
  const dispatch = useDispatchCart(); //carrello
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const products = useWish();
  const navigate = useNavigate();
  const dispatchWish = useDispatchWish();

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
      await api.get(
        `${process.env.REACT_APP_API_URL}/wishlist`
      ) 
      .then (response =>dispatchWish({ type: "UPDATE", items:response.data }))
  
      .catch (error=>console.error(error));

      
    } catch (error) {
      console.error("Errore nel like:", error);
    }
  };


  return (
    <Container className="mt-4">
      <h4 className="mb-4 mt-3 title text-center">My Wish List</h4>
      <Row>
        <Col md={3}>
          <strong>Product Name</strong>
        </Col>
        <Col md={3}>
          <strong>Price</strong>
        </Col>
        <Col md={3}>
          <strong>Go to Details</strong>
        </Col>
      </Row>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Row key={product._id} className="d-flex align-items-center mt-4">
              <Col className="mb-4">
                <Image src={product.image} style={{ width: "60%" }} />
              </Col>
              <Col md={3} className="mb-4">
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
              <Col className="mb-4">
                <Button
                  className="card_button"
                  onClick={() => addToCart(product)}
                >
                  <BiCart size={24} />
                </Button>
                <Button
                onClick={() => handleLike(product._id)}>
                    DELETE
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          <Col>
            <p>Non hai ancora aggiunto prodotti alla wishlist!</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

/* 
        <Container className='mt-4'>
            <h4 className='mb-4'>La tua Wishlist</h4>
            <Row>
                {products.length > 0 ? (
                    products.map(product => (
                    
                        <Col key={product._id} md={4} className='mb-4'>
                            <ProductsCard
                                product={product}
                                showActions={true}
                                onLikeToggle={fetchWishlist}
                            />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>Non hai ancora aggiunto prodotti alla wishlist!</p>
                    </Col>
                )}
            </Row>
        </Container>

*/

export default WishList;
