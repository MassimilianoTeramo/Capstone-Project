import { useState, useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProduct from '../pages/Edit.Product';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import ProductsCard from "../components/ProductsCard";
import { Alert } from "react-bootstrap";


const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category } = useParams();
    console.log("Category parameter:", category); // Debugging log
    const { user } = useAuth();
    const userName = user ? `${user.firstName} ${user.lastName}` : "unknown";
    const navigate = useNavigate();

    const getProductsByCategory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/category/${category}`);
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
        <Container className='mt-4'>
            <h4 className='mb-4 form-label fw-bold' style={{fontSize:'20px'}} >My Products</h4>
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
                        <p>You haven't published any post yet!</p>
                    </Col>

                )}

            </Row>


        </Container>
    )





};

export default CategoryPage;