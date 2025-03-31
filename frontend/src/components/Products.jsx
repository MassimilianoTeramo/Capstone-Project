import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateProduct from '../pages/CreateProduct';
import { useState, useEffect } from "react";  
import axios from 'axios';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);   
    const { user } = useAuth();
    
    useEffect(()=>{
        const fetchProducts = async ()=>{
            try{
                setLoading(true);
                const response = await axios.get( process.env.BACKEND_URL+"/products");
                setProducts(response.data.products);
                setError(null)
            }catch (error){
                setError(error);
                setProducts([]);
                console.error('Error fetching products', error);

            } finally{
                setLoading(false);

            }
        };
        fetchProducts()
    }, [user])
}

export default Products;