import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProduct from './EditProduct';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import '../styles/pDetails.css';


const ProductDetails =()=>{
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const { user } = useAuth();
    const userName = user? `${user.firstName} ${user.lastName}`:"unknown"
    const authorName = product.author? `${product.author.firstName} ${product.author.lastName}`: "Unknown";
    const authorContact = product.contact? `${product.contact}`: "Unknown";
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
            <Container fluid className="mt-5 mb-5">
            {loading && <p>Loading products...</p>}
            {error && <p>An error occurred: {error.message}</p>}
            {!loading && !error && (
                <Row className="d-flex justify-content-between">
                    <Col md={4} className="d-flex align-items-center mt-5">
                        <img src={product.image} alt={product.title} style={{ width: '100%' }} />
                    </Col>
                    <Col md={2}></Col>
                    <Col md={6} className='colDetails'>
                        <h1 className="text-center">{product.title}</h1>
                        <div className="mt-3 d-flex justify-content-around">
                            <p style={{fontSize:"20px"}}><span style={{color:"#2eff60", marginRight:"10px"}}>Price: </span> {product.price}€</p>
                            <p style={{fontSize:"20px"}}><span style={{color:"#2eff60", marginRight:"10px"}}>Size:</span> {product.size}</p>
                            <p style={{fontSize:"20px"}}><span style={{color:"#2eff60", marginRight:"10px"}}>Condition:</span> {product.condition}</p>
                        </div> 
                        <hr />            
                        <div className="mb-3">
                            <h3>Description</h3>
                            {product.description?.split('\n').map((paragraph, index) => (
                                <p key={index} className="content-paragraph">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <hr />
                        <div className="mb-3">
                            <h5>Seller</h5>
                            <p>{product.author.firstName} {product.author.lastName}</p>
                            <p>{product.contact}</p>
                        </div>

                        <hr />
                        <div className="d-flex justify-content-center gap-3">
                       
                            <div className="mt-3 d-flex justify-content-start gap-3 ">
                                <EditProduct product={product} 
                                style={{cursor:'pointer'}} 
                                
                                />
                                <Button 
                                    variant="danger"
                                    onClick={() => deleteProduct(id)}    
                                >
                                    Delete
                                </Button>
                            </div>
                     
                    </div>
                    </Col>

                </Row>
            )}
        </Container>
        )
}
export default ProductDetails