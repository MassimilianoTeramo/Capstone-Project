import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Card, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/pDetails.css";
import Reviews from "../components/Reviews";
import EditProduct from "../components/EditProduct";
import { color, motion } from "framer-motion";
import bgProDet from "../uploads/bgProDet.jpg";
import { useDispatchCart } from "../context/CartContext"; //carrello
import Toast from "react-bootstrap/Toast";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatchCart(); //carrello
  const [showToast, setShowToast] = useState(false); //toast
  const [showNotification, setShowNotification] = useState(false);
  const userName = user ? `${user.firstName} ${user.lastName}` : "unknown";
  const authorName = product.author
    ? `${product.author.firstName} ${product.author.lastName}`
    : "Unknown";
  const authorContact = product.contact ? `${product.contact}` : "Unknown";
  const navigate = useNavigate();

  //carrello
  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${id}`
        );
        if (response.status === 200) {
          setProduct(response.data);
          setError(null);
        } else {
          setError(new Error("Product not found"));
        }
      } catch (error) {
        setError(error);
        setProduct({});
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3002/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`Product with ID ${id} deleted successfully`);
      navigate("/myproducts");

      if (response.status === 200) {
        alert("Product eliminated!");
      } else {
        throw new Error("Not Eliminated");
      }
    } catch (error) {
      alert(error.message);
      console.log(`Product with ID ${id} not deleted`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgProDet})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        width: "auto",
        height: "auto",
        marginTop: "-10px",
      }}
    >
      <Container className="pt-5 pb-5">
        {loading && <p>Loading products...</p>}
        {error && <p>An error occurred: {error.message}</p>}
        {!loading && !error && (
          <Row className="d-flex justify-content-between">
            <div>
              <Button variant="warning" onClick={() => navigate("/products")}>
                Back to Products
              </Button>
            </div>

            <Col md={4} className="d-flex align-items-center mt-5">
              <img
                src={product.image}
                className="imageDetail"
                alt={product.title}
                style={{ width: "100%" }}
              />
            </Col>
            <Col md={6} className="colDetails">
              <h1 className="text-center" style={{ fontFamily: "Anek Odia" }}>
                {product.title}
              </h1>
              <div className="mt-3 d-flex justify-content-around infosDetails">
                <p>
                  <span>Price:</span>
                  {product.price} £
                </p>
                <p>
                  <span>Size:</span>
                  {product.size}
                </p>
                <p>
                  <span>Gender:</span>
                  {(product.gender ?? "unknown").charAt(0).toUpperCase() +
                    (product.gender ?? "unknown").slice(1)}
                </p>
                <p>
                  <span>Condition:</span>
                  {product.condition}
                </p>
              </div>
              <hr />
              <div className="mb-3">
                <h5>Description</h5>
                {product.description?.split("\n").map((paragraph, index) => (
                  <p key={index} className="content-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>

              <hr />
              <div className="mb-3">
                <h5>Seller Information</h5>
                <p>
                  {product.author.firstName} {product.author.lastName}
                </p>
                <p>{product.author.email}</p>
              </div>
              <hr />
              <Reviews
                productId={product._id}
                productAuthorId={product.author._id}
              />

              {user && user._id !== product.author._id ? null : (
                <>
                  <hr />
                  <div className="d-flex justify-content-center gap-3">
                    <div className="mt-3 d-flex justify-content-start gap-3">
                      <EditProduct
                        product={product}
                        style={{ cursor: "pointer", backgroundColor: "blue" }}
                      />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="danger"
                          onClick={() => deleteProduct(id)}
                        >
                          Delete
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </>
              )}
              {user && user._id !== product.author._id && (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="text-center">
                    <Toast
                      onClose={() => setShowToast(false)}
                      show={showToast}
                      delay={2000}
                      autohide
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "gold",
                        zIndex: 1,
                      }}
                    >
                      <Toast.Body>Item added to the cart!</Toast.Body>
                    </Toast>
                  </div>

                  <div className="d-flex justify-content-center mt-3">
                    <Button
                      variant="warning"
                      onClick={() => {
                        addToCart(product);
                        setShowToast(true);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};
export default ProductDetails;
