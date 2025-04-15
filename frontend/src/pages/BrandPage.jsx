import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import ProductsCard from "../components/ProductsCard";
import { Alert } from "react-bootstrap";
import api from '../utils/api';
import brandBg from "../uploads/b7.jpg";

const BrandPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { brand } = useParams();
    console.log("brand parameter:", brand); // Debugging log
    const { user } = useAuth();
    const navigate = useNavigate();

    const getProductsByBrand = async () => {
      try {
        const response = await api.get(`${process.env.REACT_APP_API_URL}/products/brand/${brand}`);
        console.log("Response from API:", response.data); // Debugging log
       
        console.log("Products fetched:", response.data); // Debugging log
        setProducts(response.data);
        setError(null);
        setLoading(false);
        return response.data; // Restituisce i prodotti
      } catch (error) {
        console.error("Errore nel recupero dei prodotti per categoria:", error);
        throw error;
      }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsByBrand();
                setProducts(data);
                setLoading(false);
                setError('');
            } catch (err) {
                setError('Errore nel recupero dei prodotti');
                console.log(err);

            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [brand]);


    if (loading) return <Container className='mt-4'><p>Loading...</p></Container>;
    if (error) return <Container className='mt-4'><Alert variant='danger'>{error}</Alert></Container>;

    return (
        <div style={{ 
            backgroundImage: `url(${brandBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundBlendMode:"darken",
            width:"auto",
            height:"35rem",
            marginTop:"-10px"
          }}>
        <Container className='mt-4 brandContainer'>
            <h4 className='mb-4 form-label fw-bold' style={{fontSize:'20px'}} >{products.brand}</h4>
            <Row>
                {products.length > 0 ? (
                    products.map(product => (
                        <Col key={product._id} md={4} className='mb-4'>
                            <ProductsCard
                                product={product}
                                showActions={true}/>
                                                              
                        </Col>
                    ))
                ):(
                    <Col>
                        <p>No products at the moment</p>
                    </Col>

                )}

            </Row>
        </Container>
        </div>
    )

     



};

export default BrandPage;