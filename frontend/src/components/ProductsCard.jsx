// import { Card, Button, CardBody, Badge } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import EditProduct from '../pages/Edit.Product';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';
import { useState } from 'react';
import {Button} from 'react-bootstrap';
import ProductDetails from '../pages/ProductDetails';

const ProductsCard =({product})=>{
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const userName = user? `${user.firstName} ${user.lastName}`:"unknown"
    const authorName = product.author? `${product.author.firstName} ${product.author.lastName}`: "Unknown";
    const [error, setError] = useState('');


    return (
        <div className="card">
           <img className="card_img" src={product.image} alt={product.title} />
          <div className="card_data">
            <div className="card_title">{product.title}</div>
            <div className="mb-2 card_price">£ {product.price}</div>
            <div>
              <div className="card_description">
              {product.description}
              </div>
            </div>
          {userName === authorName ? (
           <div className="mt-3 d-flex justify-content-start gap-3">
            <Button 
              variant="warning" 
              className="card_button"
              onClick={() => navigate(`/products/${product._id}`)}
              > Details </Button> 
            {/* <Button onClick={()=> deleteProduct(product._id)}> Delete </Button> */}
           </div>
          ) : (
          <button variant="warning" className="card_button">Add to cart</button>
          )}
         </div>
       </div>
       
    )
    

}

export default ProductsCard;