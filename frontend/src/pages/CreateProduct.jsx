import {useState} from "react";
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const CreateProduct = ()=> {
    const { user } = useAuth(); // Retrieve the logged-in user from AuthContext

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: "",
        price: "",
        category: "",
        author: user ? user.firstName : "",// Set the author to the logged-in user's first name
        rate: "",
    });
   
    const [productImg, setProductImg] = useState(null);
    const [previewUrl, setPreviewUrl] = useState ("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
   
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImg(file);
            setProductImg(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user || !user._id) {
                setError('Log in to start selling');
                return;
            }
    
            if (!productImg) {
                setError('L\'immagine di copertina è obbligatoria');
                return;
            }
           

            const sentForm = new FormData();
            sentForm.append('name', formData.name);
            sentForm.append('description', formData.description);
            sentForm.append('price', formData.price);
            sentForm.append('category', formData.category);
            sentForm.append('author', user._id);
            sentForm.append('condition', formData.condition);
            sentForm.append('image', productImg);

            const response = await axios.post(
                "http://localhost:3002/products", sentForm, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
        }catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "something wrong creating the product")
        }
};
return (
    <Container>
    <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
            <h1 className="form-title mt-3">Sell your product</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} className="form-container">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required    
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>select</option>
                        <option value="shirts">Shirt</option>
                        <option value="shoes">Shoes</option>
                        <option value="shorts">Shorts</option>
                        <option value="socks">Socks</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
        <Form.Label>Image</Form.Label>
        <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
        />
        {previewUrl && (
            <img 
                src={previewUrl} 
                alt="Preview" 
                className="mt-2" 
                style={{maxWidth: '200px'}} 
            />
        )}
    </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        size="sm"
                        rows={5}
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="£"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Conditions</Form.Label>
                    <Form.Control 
                        as="select"
                        value={formData.condition}
                        onChange={e => setFormData({ ...formData, condition: e.target.value })}
                    >
                        <option>choose</option>
                        <option value="poor">Poor</option>
                        <option value="decent">Decent</option>
                        <option value="good">Good</option>
                        <option value="perfect">Perfect</option>
                    </Form.Control>
                </Form.Group>
                <Button className="submit-button" variant="primary" type="submit">
                    Publish it!
                </Button>
            </Form>
        </Col>
    </Row>
</Container>
)};

export default CreateProduct; 