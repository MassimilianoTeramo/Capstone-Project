import { Card, Button, CardBody, Badge } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const ProductsCard =({product})=>{
    const authorName = product.author? `${product.author.firstName} ${product.author.lastName}`: "unknown";
    const navigate = useNavigate();

    return (

        <h1>qui vanno i prodotti</h1>
    )


}

export default ProductsCard;