import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BiCart } from "react-icons/bi";
import { GiSoccerBall } from "react-icons/gi";
import api from "../utils/api";
import { Card } from "react-bootstrap";
import { useDispatchCart } from "../context/CartContext"; //carrello
import { useWish } from "../context/WishListContext";
import { useDispatchWish } from "../context/WishListContext";
import { motion, AnimatePresence, inertia } from "framer-motion";

const CardVariants = {
  initial: {
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    overflow: "hidden",
  },
  whileHover: {
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const notificationVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    y: -20,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.3,
    transition: {
      duration: 0.3,
    },
  },
};

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
          likedProducts.find((p) => p?._id === product._id) !== undefined;
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
    <motion.div
      variants={CardVariants}
      initial="initial"
      whileHover="whileHover"
    >
      <Card
        id="card"
        className="mb-4 position-relative d-flex align-items-center pt-3"
      >
        {showActions && user && user._id !== product.author._id && (

          <>        
           <Button
            variant="link"
            className="position-absolute p-1"
            onClick={handleLike}
            disabled={!user}
            style={{
              zIndex: 4,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
              top: "10px",
              right: "10px",
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

          <AnimatePresence>
          {showNotification && (
            <motion.div
              variants={notificationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bannerWish"
            >
              Item added to your Wish List!
            </motion.div>
          )}
        </AnimatePresence>
        </>

        )}

        <Card.Img
          variant="top"
          src={product.image}
          className="card_img"
          style={{ filter: isLiked ? "brightness(1.2)" : "none" }}
        />

        <Card.Body className="card_data">
          <Card.Title className="card_title">{product.title}</Card.Title>
          <div className="card_price">£ {product.price}</div>
        </Card.Body>

        {showActions && (
          <div className="card_buttons">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                className="card_button"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                Dettagli
              </Button>
            </motion.div>
            {user && user._id !== product.author._id && (
              <>
                  <Button
                    className="card_button"
                    onClick={() => addToCart(product)}
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
                      className="bannerCart"
                    >
                      Item added to your cart!
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default ProductsCard;
