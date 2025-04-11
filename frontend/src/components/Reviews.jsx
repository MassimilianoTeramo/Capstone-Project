import { useState, useEffect } from 'react';
import { Form, Button, Alert, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [error, setError] = useState('');
    const { user } = useAuth();

    const fetchReviews = async () => {
        if (!productId) {
            console.error("product is not defined");
            return;
        }

        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/reviews/product/${productId}`);
            setReviews(response.data);
        } catch (err) {
            setError('Errore nel caricamento dei commenti');
            console.error("Error fetching comments:", err);
        }
    };

    useEffect(() => {
       
            fetchReviews();
    }, [productId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('Devi essere autenticato per lasciare una review');
            return;
        }

        if (!productId) {
            setError('ID del post non valido');
            return;
        }
        if (!newReview) {
            setError('Il commento non può essere vuoto');
            return;
        }
        try {
           
            const response = await axios.post(process.env.REACT_APP_API_URL +'/reviews', {
                content: newReview,
                author: user._id,
                product: productId
            });

            console.log('Risposta reviews:', response.data);
            await fetchReviews();

            setReviews([response.data, ...reviews]);
            setNewReview('');
            setError('');
        } catch (err) {
            console.error('Errore completo:', err.response || err);
            setError(err.response?.data?.message || 'Errore durante l\'invio della review');
        }
    };

    const handleDelete = async (reviewId) => {
    
        try {

            const response = await axios.delete(process.env.REACT_APP_API_URL + `/reviews/${reviewId}`);
            
            if (response.status === 200) {
                setReviews(reviews.filter(c => c._id !== reviewId));
                setError('');
                console.log('Review eliminata con successo');
            }
        } catch (err) {
            console.error('Errore completo:', err.response || err);
            if (err.response?.status === 401) {

            } else if (err.response?.status === 403) {
                setError('Non sei autorizzato a eliminare questa review');
            } else {
                setError('Errore durante l\'eliminazione della recensione');
            }
        }
    };

    return (
        <div className="comments-section">
            <h2 className='mt-4 mb-4 form-label' style={{fontSize:"20px"}}>Reviews</h2>
            {reviews.length === 0 && <Alert variant="info">No comments yet</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            
            {user ? (
                <Form onSubmit={handleReviewSubmit} className="comment-form form-container mb-4">
                    <Form.Group controlId="comment">
                        <Form.Label className='form-label'>Leave a Review</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Scrivi un commento..."
                            required
                            className="form-control"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-2 submit-button">
                        Submit
                    </Button>
                </Form>
            ) : (
                <Alert variant="info">
                    Log In to leave a Review
                </Alert>
            )}

            <ListGroup className='mt-4' style={{borderRadius:'15px'}}>
                {reviews.map((review) => (
                    <ListGroup.Item key={review._id} className="review-item form-container">
                        <div style={{fontStyle:'italic'}} className="form-label" >
                            {review.author?.firstName || 'Utente Eliminato'} {review.author?.lastName || ''}
                        </div>
                        <div className="review-text" style={{color:'black'}}>{review.content}
                            <div className='text-muted small pt-2 pb-2'>{new Date(review.createdAt).toLocaleString()}</div>
                        </div>
                        {user && review.author && user._id === review.author._id && (
                            <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDelete(review._id)} 
                                className="mt-2"
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