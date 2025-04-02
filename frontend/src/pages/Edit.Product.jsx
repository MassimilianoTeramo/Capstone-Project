import {useEffect, useState} from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    const [productImg, setProductImg] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        author: '',
        image: '',
       
    });

    useEffect(()=>{
        const fetchEdit= async()=>{
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:3002/products/${id}`);
                const product = res.data;
                console.log(res.data)

                setFormData({
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    description: product.description,
                    author: user.firstName + " " + user.lastName,
                    image:product.image 
                })
                setPreviewUrl(productImg) 

            } catch (err){
                setError('error uploading your product')
                console.error(err) 
            } finally {
                setLoading(false)
            }
        };
        
        fetchEdit();
    }, [id, user.firstName, user.lastName]); 

    const handleImageChange=(e)=>{
        const file = e.target.files[0];
        if(file){
            setProductImg(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleEdit = async (e) =>{
        e.preventDefault()
        try {
            const editedForm = new FormData();
            editedForm.append('title', formData.title);
            editedForm.append('description', formData.description);
            editedForm.append('category', formData.category);
            editedForm.append('price', formData.price);

            if (productImg){
                editedForm.append('image', productImg)
            }

            // Log dei dati inviati
            console.log('Form data:', {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                category: formData.category,
                image: productImg
            });

            const updatedProduct = await axios.put(
                `http://localhost:3002/products/${id}`,
                editedForm,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (updatedProduct.status === 200) {
                alert("Modifiche completate con successo");
                navigate('/myproducts');
            } else {
                alert("Errore durante l'aggiornamento del prodotto. Riprova.");
            }

        } catch (err) {
            console.error('Errore:', err);
            setError(err.response?.data?.message || 'Errore durante l\'aggiornamento del prodotto');
            alert(err.response?.data?.message || 'Errore durante l\'aggiornamento del prodotto');
        }
    };

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
        Edit Product
      </Button>

      <Modal show={show} onHide={handleClose} className="modal-dark">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="form-title">Edit your product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-container">
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Title</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required    
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                <option value="shirts">Shirts</option>
                <option value="shoes">Shoes</option>
                <option value="shorts">Shorts</option>
                <option value="socks">Socks</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
              <Form.Label className="form-label">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Price</Form.Label>
              <Row>
                <Col xs={8}>
                <Form.Control
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder="£"
                  required
                  min="0"
                  step="0.01"
                />
                </Col>
              </Row>
            </Form.Group>
            <div className="d-flex gap-3">
              <Button className="submit-button" type="submit">
                Save
              </Button>
              <Button className="submit-button" onClick={handleClose} style={{ background: 'transparent', border: '2px solid #2eff60' }}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
        </>
    )
};

export default EditProduct;