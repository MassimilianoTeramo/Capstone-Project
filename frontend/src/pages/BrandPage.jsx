import { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditProduct from "../components/EditProduct";
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import ProductsCard from "../components/ProductsCard";
import { Alert } from "react-bootstrap";
import api from "../utils/api";
import FilterComponent from "../components/FilterComponent";
import brandBg from "../uploads/b7.jpg";
import {motion} from "framer-motion";

const BrandPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const { brand } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCloseFilter = () => setShowFilter(false);
    const handleShowFilter = () => setShowFilter(true);

    const getProductsByBrand = async () => {
        try {
            const response = await api.get(`${process.env.REACT_APP_API_URL}/products/brand/${brand}`);
            setProducts(response.data);
            setAllProducts(response.data);
            setError(null);
            setLoading(false);
            return response.data;
        } catch (error) {
            console.error("Errore nel recupero dei prodotti per brand:", error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsByBrand();
                setProducts(data);
                setAllProducts(data);
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
            height:"auto",
            marginTop:"-10px"
          }}>
        <Container className="mt-5 py-2">
          
            <div className="d-flex gap-3 justify-content-between align-items-center my-5">
                  <motion.div
             initial={{x:"-100vh", opacity:0}}
             animate={{ fontSize: "50px", x: 0, opacity:1, color:"gold", letterSpacing:"5px" }}
             transition={{duration: 3, type:"spring", stiffness: 50, mass:"2", dumpling:"6" }}
             >
                <h3>{brand.toUpperCase()}</h3>
            </motion.div>
            <motion.div 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}>
                    <Button variant="warning" onClick={handleShowFilter}>
                        Filter
                    </Button>
             </motion.div>   
                <FilterComponent 
                    showFilter={showFilter}
                    handleCloseFilter={handleCloseFilter}
                    allProducts={allProducts}
                    setProducts={setProducts}
                    hideBrandFilter={true}
                />
            </div>
            <Row>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Col key={product._id} md={3} className="mb-4">
                            <ProductsCard product={product} showActions={true} />
                        </Col>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </Row>
        </Container>
        </div>
    );
};

export default BrandPage;