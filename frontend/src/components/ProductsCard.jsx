import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { BiCart } from "react-icons/bi";
import { GiSoccerBall } from "react-icons/gi";
import api from "../utils/api";
import { Card } from "react-bootstrap";
import EditProduct from "../pages/EditProduct";
import { useDispatchCart } from "../context/CartContext"; //carrello

const ProductsCard = ({ product, showActions, onLikeToggle }) => {
  const dispatch = useDispatchCart(); //carrello
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : "unknown";
  const authorName = product.author? `${product.author.firstName} ${product.author.lastName}`: "Unknown";
  const [error, setError] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  //carrello
  const addToCart = (item)=>{
    dispatch({type: "ADD", item})
  };

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        try {
          const response = await api.get(
            `${process.env.REACT_APP_API_URL}/wishlist`
          );
          const likedProducts = response.data;
          const isProductLiked =
            likedProducts.find((p) => p._id === product._id) !== undefined;
          setIsLiked(isProductLiked);
        } catch (error) {
          console.error("Errore nel controllo dei like:", error);
        }
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
      if (onLikeToggle) {
        onLikeToggle();
      }
    } catch (error) {
      console.error("Errore nel like:", error);
    }
  };

  return (
    <Card id="card" style={{ width: "18rem" }} className="mb-4 position-relative d-flex align-items-center pt-3">
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
              color: isLiked ? "#2eff60 " : "#ffffff",
              filter: isLiked
                ? "drop-shadow(0px 0px 3px rgb(46, 255, 96)"
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
              className="card_button" style={{width: "100px", fontSize: "12px"}}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              Dettagli
            </Button>
          {user && user._id !== product.author._id ? (
            <Button 
              className="card_button"
              onClick={() => addToCart(product)}
              style={{width: "100px", fontSize: "12px"}}
            >
              <BiCart size={24} />
            </Button>
          ) : (
            <div>
            <Button
              className="card_button" 
              as={Link}
              style={{width: "100px", fontSize: "12px"}}
              to={`/products/category/${product.category}`}
            >Go to {product.category}</Button>
          </div>
          )}
          </div>
        

        )}
      </Card.Body>
    </Card>
  );
};

export default ProductsCard;
