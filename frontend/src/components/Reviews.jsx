import { useState, useEffect } from "react";
import { Form, Button, Alert, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "gold",
  },
  "& .MuiRating-iconEmpty": {
    color: "gray",
  },
});

const Reviews = ({ productId, productAuthorId }) => {
  const [reviews, setReviews] = useState([]);
  const [rate, SetRate] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRate, setNewRate] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  const fetchReviews = async () => {
    if (!productId) {
      console.error("product is not defined");
      return;
    }

    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/reviews/product/${productId}`
      );
      setReviews(response.data);
    } catch (err) {
      setError("Errore nel caricamento dei commenti");
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Devi essere autenticato per lasciare una review");
      return;
    }

    if (!productId) {
      setError("ID del post non valido");
      return;
    }
    if (!newReview) {
      setError("Il commento non può essere vuoto");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/reviews",
        {
          content: newReview,
          author: user._id,
          product: productId,
          rate: newRate,
        }
      );

      console.log("Risposta reviews:", response.data);
      await fetchReviews();

      setReviews([response.data, ...reviews]);
      setNewReview("");
      setError("");
    } catch (err) {
      console.error("Errore completo:", err.response || err);
      setError(
        err.response?.data?.message || "Errore durante l'invio della review"
      );
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_API_URL + `/reviews/${reviewId}`
      );

      if (response.status === 200) {
        setReviews(reviews.filter((c) => c._id !== reviewId));
        setError("");
        console.log("Review eliminata con successo");
      }
    } catch (err) {
      console.error("Errore completo:", err.response || err);
      if (err.response?.status === 401) {
        setError("Non sei autorizzato a eliminare questa review");
      } else if (err.response?.status === 403) {
        setError("Non sei autorizzato a eliminare questa review");
      } else {
        setError("Errore durante l'eliminazione della recensione");
      }
    }
  };

  // Controlla se l'utente corrente è l'autore del prodotto
  const isProductAuthor =
    user && productAuthorId && user._id === productAuthorId;

  return (
    <div className="comments-section">
      <h5
        className="mt-4 mb-4 form-label"
        style={{ color: "rgb(255, 210, 46)" }}
      >
        Reviews
      </h5>
      {reviews.length === 0 && <Alert variant="warning">No Reviews yet</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {user && !isProductAuthor ? (
        <Form
          onSubmit={handleReviewSubmit}
          className="comment-form form-container mb-4"
        >
          <Form.Group>
            <StyledRating
              name="simple-controlled"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              icon={
                <FontAwesomeIcon icon={faFutbol} style={{ fontSize: "24px" }} />
              }
              emptyIcon={
                <FontAwesomeIcon icon={faFutbol} style={{ fontSize: "24px" }} />
              }
              max={5}
            />
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Control
              as="textarea"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Leave a Review..."
              required
              className="form-control"
            />
          </Form.Group>
          <motion.div
            className="d-flex justify-content-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="warning"
              type="submit"
              className="mt-4 submit-button"
            >
              Submit
            </Button>
          </motion.div>
        </Form>
      ) : !user ? (
        <Alert variant="danger">Log In to leave a Review</Alert>
      ) : (
        isProductAuthor && null
      )}

      <ListGroup
        className="mt-4 review_container"
        style={{ borderRadius: "15px" }}
      >
        {reviews.map((review) => (
          <ListGroup.Item
            key={review._id}
            className="review-item form-container"
          >
            <div
              style={{ fontStyle: "italic" }}
              className="form-label d-flex justify-content-around"
            >
              <span>
                {review.author?.firstName || "Utente Eliminato"}{" "}
                {review.author?.lastName || ""}
              </span>
              <span>
                <StyledRating
                  value={review.rate}
                  readOnly
                  icon={
                    <FontAwesomeIcon
                      icon={faFutbol}
                      style={{ fontSize: "20px" }}
                    />
                  }
                  emptyIcon={
                    <FontAwesomeIcon
                      icon={faFutbol}
                      style={{ fontSize: "20px" }}
                    />
                  }
                  max={5}
                />
              </span>
            </div>
            <div className="review-text" style={{ color: "#ffffff" }}>
              {review.content}
              <div className="small pt-2 pb-2" style={{ color: "#ffffff9a" }}>
                {new Date(review.createdAt).toLocaleString()}
              </div>
            </div>
            {user && review.author && user._id === review.author._id && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(review._id)}
                className="my-2"
              >
                Delete
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Reviews;
