import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProduct from "../components/EditProduct";
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import ProductsCard from "../components/ProductsCard";
import { Alert } from "react-bootstrap";
import api from "../utils/api";
import {motion} from "framer-motion";


const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const getProductsByCategory = async () => {
        try {
            const response = await api.get(`${process.env.REACT_APP_API_URL}/products/category/${category}`);
            setProducts(response.data);
            setError(null);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error("Errore nel recupero dei prodotti per categoria:", error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsByCategory();
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
    }, [category]);

    if (loading) return <Container className='mt-4'><p>Loading...</p></Container>;
    if (error) return <Container className='mt-4'><Alert variant='danger'>{error}</Alert></Container>;

    return (
        <Container className='mt-5'>
            <div className="d-flex justify-content-between align-items-center">
            <motion.h3
                initial={{x:"-100vw", opacity:0, color:"black"}}
                animate={ {x:0, opacity:1, color:"gold"}}
                transition={{duration:"2.5", stiffness: 50, type:"spring"}} 
                className='my-4 fw-bold'
                style={{fontFamily:"Anek Odia", letterSpacing:"5px"}} 
                >
                {category.toUpperCase()}
            </motion.h3>
            <div>
        <Button variant="warning" 
           onClick={() => navigate("/")} >
          Back Home
          </Button>
          </div>
          </div>
            <Row>
                {products.length > 0 ? (
                    products.map(product => (
                        <Col key={product._id} lg={3} md={4} sm={12} className='mb-4'>
                            <ProductsCard
                                product={product}
                                showActions={true}
                                onLikeToggle={getProductsByCategory}
                            />
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p>No products in this category!</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default CategoryPage;