import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ProductsCard from '../components/ProductsCard';
import { Container, Alert, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../utils/api' // Assicurati di avere il percorso corretto per l'API

const MyProducts =  ()=>{
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();
    const {token} = useAuth();
    const {id} = useParams();

    const getMyProducts = async () => {
        try {
            const response = await api.get(`${process.env.REACT_APP_API_URL}/products/myproducts`); // Usa l'istanza Axios configurata
            console.log(response.data);
            return response.data; // Restituisci i prodotti
        } catch (error) {
            console.error('Errore nel recupero dei prodotti per autore:', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getMyProducts();
                setProducts(response);
                setError('');
            } catch (error) {
                setError('Error fetching products');
                console.log(error)
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [user, token]);

    



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
                        <p>You haven't advertised any product yet!</p>
                    </Col>

                )}

            </Row>


        </Container>
    )
}
export default MyProducts;