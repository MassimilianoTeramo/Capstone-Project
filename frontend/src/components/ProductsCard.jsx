// import { Card, Button, CardBody, Badge } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const ProductsCard =({product})=>{
    const authorName = product.author? `${product.author.firstName} ${product.author.lastName}`: "unknown";
    const navigate = useNavigate();

    return (
        <div className="card">
            <div className="card_img">{product.image}</div>
        <div className="card_data">
          <div className="card_title">{product.name}</div>
          <div className="mb-2 card_price">£ {product.price}</div>
          <div>
          <div className="card_description">
           {product.description}
          </div>
          </div>
          <button variant="warning" className="card_button">Add to cart</button>
        </div>
      </div>
    )


}

export default ProductsCard;