import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProduct from '../pages/Edit.Product';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";


const ProductDetails =()=>{
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const { user } = useAuth();
    const userName = user? `${user.firstName} ${user.lastName}`:"unknown"
    const authorName = product.author? `${product.author.firstName} ${product.author.lastName}`: "Unknown";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
                if (response.status === 200) {
                    setProduct(response.data);
                    setError(null);
                } else {
                    setError(new Error('Product not found'));
                }
            } catch (error) {
                setError(error);
                setProduct({});
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }
    , [id]);

    const deleteProduct = async () => {
        try {
          const response = await axios.delete(`http://localhost:3002/products/${id}`);
          console.log(`Product with ID ${id} deleted successfully`);
          navigate('/myproducts')

          if (response.status === 200) {
            alert('Product eliminated!');
          } else {
            throw new Error('Not Eliminated');
          }
       

        } catch (error) {
          alert(error.message);
          console.log(`Product with ID ${id} not deleted`);
          
        }
      };
    


        return(
            <Container className="mt-5">
            {loading && <p>Loading products...</p>}
            {error && <p>An error occurred: {error.message}</p>}
            {!loading && !error && (
                <Row>
                    <Col md={4} className="d-flex align-items-center">
                        <img src={product.image} alt={product.title} style={{ width: '100%' }} />
                    </Col>
                    <Col md={8} style={{ textAlign: 'justify', color: 'white' }}>
                        <h1 className="form-title">{product.title}</h1>
                        <div className="Product-content">
                            {product.description?.split('\n').map((paragraph, index) => (
                                <p key={index} className="content-paragraph">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="d-flex justify-content-start gap-3 ">
                        {userName === authorName && (
                            <div className="mt-3 d-flex justify-content-start gap-3">
                                <EditProduct 
                                style={{cursor:'pointer'}} 
                                />
                                <Button 
                                    variant="danger"
                                    onClick={() => deleteProduct(id)}    
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    </Col>

                </Row>
            )}
        </Container>
        )
}
export default ProductDetails