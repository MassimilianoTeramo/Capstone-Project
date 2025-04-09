import { useState, useEffect } from "react";
import { Col, Container, Row, Image, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-bootstrap";
import api from "../utils/api";
import { BiCart } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_URL}/wishlist`
      );
      setProducts(response.data);
      setError(null);
    } catch (error) {
      setError("Errore nel recupero della wishlist");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setError("Devi effettuare il login per vedere la tua wishlist");
      setLoading(false);
    }
  }, [user]);

  if (loading)
    return (
      <Container className="mt-4">
        <p>Loading...</p>
      </Container>
    );
  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

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
            </Button></Col>
              <Col className="mb-4">
                <Button className="card_button">
                  <BiCart size={24} />
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
