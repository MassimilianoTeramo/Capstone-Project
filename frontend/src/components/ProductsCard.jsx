import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { BiCart } from "react-icons/bi";
import { GiSoccerBall } from "react-icons/gi";
import api from "../utils/api";
import { Card } from "react-bootstrap";
import EditProduct from "./EditProduct";
import { useDispatchCart } from "../context/CartContext"; //carrello
import { useWish } from "../context/WishListContext";
import { useDispatchWish } from "../context/WishListContext";
import Toast from "react-bootstrap/Toast";
import { motion, AnimatePresence } from "framer-motion";

const notificationVariants = {
  initial: { 
    opacity: 0,
    y: 50,
    scale: 0.3
  },
  animate: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.3,
    transition: {
      duration: 0.3
    }
  }
}

const ProductsCard = ({ product, showActions }) => {
  const dispatch = useDispatchCart(); //carrello
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : "unknown";
  const authorName = product.author
    ? `${product.author.firstName} ${product.author.lastName}`
    : "Unknown";
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const likedProducts = useWish();
  const dispatchWish = useDispatchWish();
  const [showNotification, setShowNotification] = useState(false);

  //carrello
  const addToCart = (item) => {
    dispatch({ type: "ADD", item });
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        const isProductLiked =
          likedProducts.find((p) => p._id === product._id) !== undefined;
        setIsLiked(isProductLiked);
      }
    };
    checkIfLiked();
  }, [user, product._id]);

  const handleLike = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await api.post(
        `${process.env.REACT_APP_API_URL}/wishlist/${product._id}`
      );
      setIsLiked(response.data.isLiked);
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
    <Card
      id="card"
      style={{ width: "18rem" }}
      className="mb-4 position-relative d-flex align-items-center pt-3"
    >
      {/* Pulsante like posizionato in alto a destra */}
      {showActions && user && user._id !== product.author._id && (
        <Button
          variant="link"
          className="position-absolute top-0 end-0 p-2"
          onClick={handleLike}
          disabled={!user}
          style={{
            zIndex: 4,
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
          }}
        >
          <GiSoccerBall
            style={{
              fontSize: "30px",
              color: isLiked ? "#e1ae07 " : "#ffffff",
              filter: isLiked
                ? "drop-shadow(0px 0px 3px #e1ae07"
                : "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.5))",
              transition: "all 0.3s ease",
            }}
          />
        </Button>
      )}

      <Card.Img
        variant="top"
        src={product.image}
        className="card_img"
        style={{
          height: "200px",
          objectFit: "cover",
          filter: isLiked ? "brightness(1.2)" : "none",
          transition: "all 0.3s ease",
        }}
      />
      <Card.Body className="card_data mt-3">
        <Card.Title className="card_title">{product.title}</Card.Title>

        <div className="mt-2 mb-2 card_price">£ {product.price}</div>

        {showActions && (
          <div className="d-flex justify-content-around">
            <Button
              className="card_button"
              style={{ width: "100px", fontSize: "12px" }}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              Dettagli
            </Button>
            {user && user._id !== product.author._id ? (
              <>
           
                <Button
                  className="card_button"
                  onClick={() => addToCart(product)}
                  style={{ width: "100px", fontSize: "12px" }}
                >
                  <BiCart size={24} />
                </Button>
                <AnimatePresence>
                  {showNotification && (
                    <motion.div
                      variants={notificationVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      style={{
                        position: 'absolute',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        bottom: "11rem",
                        color: 'gold',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        zIndex: 1000
                      }}
                    >
                      Prodotto aggiunto al carrello!
                    </motion.div>
                  )}
                </AnimatePresence>
                </>

            ) : (
             
                <Button
                  className="card_button"
                  as={Link}
                  style={{ width: "100px", fontSize: "12px" }}
                  to={`/products/category/${product.category}`}
                >
                  Go to {product.category}
                </Button>

            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductsCard;
