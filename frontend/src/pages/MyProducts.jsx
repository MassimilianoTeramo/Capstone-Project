import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ProductsCard from '../components/ProductsCard';
import { Container, Alert, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const MyProducts = ()=>{
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();
    const {id} = useParams();

    const getMyProducts = async()=>{

        try{
            setLoading(true)
            const res = await axios.get(`http://localhost:3002/product/filtered`);
            console.log(user._id);
            setProducts(res.data.products);
            
        } catch(err){
            setError('Something wrong uploading your products');

        } finally {
            setLoading(false)
        }
    };

    useEffect(()=>{
        if(user){
            getMyProducts()
        }
    }, [user]);



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
}
export default MyProducts;