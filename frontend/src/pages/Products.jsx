import {Container, Row, Col, Pagination} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateProduct from './CreateProduct';
import { useState, useEffect } from "react";
import axios from 'axios';
import ProductsCard from '../components/ProductsCard';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(null);
    const [error, setError] = useState(null); 
    const [totalPages, setTotalPages] = useState(0);  
    const { user } = useAuth();
    
    useEffect(()=>{
        const fetchProducts = async ()=>{
            try{
                setLoading(true);
                const response = await axios.get( `http://localhost:3002/products?page=${currentPage}`);
                setProducts(response.data.products);
                setTotalPages(response.data.totalPages);
                setError(null)
                if(response.data.products.length === 0) console.log("nessun prodotto trovato")

            }catch (error){
                setError(error);
                setProducts([]);
                console.error('Error fetching products', error);

            } finally{
                setLoading(false);

            }
        };
        fetchProducts()
    }, [user, currentPage]);

return (
    <Container className="mt-5">
    {loading && <p>Loading products...</p>}
    {error && <p>An error occurred: {error.message}</p>}
    <Row>
      {!loading && !error && products.length > 0 ? (
        products.map(product => (
          <Col key={product._id} md={4} className="mb-4">
            <ProductsCard product={product} />
          </Col>
        ))
      ) : (
        <p>No products available</p>
      )}
    </Row>
   {totalPages > 1 && (
      <div>
        <Pagination className="justify-content-center">
          <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
        </Pagination>
      </div>
    )} 
</Container>
)

}





export default Products;