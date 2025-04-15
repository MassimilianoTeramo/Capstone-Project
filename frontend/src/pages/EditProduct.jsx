import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { token } = useAuth();
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
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    condition: "",
    size: "",
    brand: "",
    author: user ? user.firstName + user.lastName : "",
    gender: "",
  });

  useEffect(() => {
    const fetchEdit = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `${process.env.REACT_APP_API_URL}/products/${id}`
        );
        const product = res.data;
        console.log(res.data);

        setFormData({
          title: product.title,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.image,
          condition: product.condition,
          size: product.size,
          brand: product.brand,
          gender: product.gender,
        });
        setPreviewUrl(productImg);
      } catch (err) {
        setError("error uploading your product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEdit();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const editedForm = new FormData();
      editedForm.append("title", formData.title);
      editedForm.append("description", formData.description);
      editedForm.append("category", formData.category);
      editedForm.append("price", formData.price);
      editedForm.append("condition", formData.condition);
      editedForm.append("size", formData.size);
      editedForm.append("brand", formData.brand);
      editedForm.append('gender', formData.gender);

      if (productImg) {
        editedForm.append("image", productImg);
      }

      // Log dei dati inviati
      console.log("Form data:", {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        image: productImg,
        condition: formData.condition,
        size: formData.size,
        brand: formData.brand,
        gender: formData.gender,
      });

      if (!process.env.REACT_APP_API_URL) {
        throw new Error("API URL is not defined. Please check your .env file.");
      }

      const updatedProduct = await api.put(
        `${process.env.REACT_APP_API_URL}/products/${id}`,
        editedForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Modifiche completate con successo");
      navigate("/myproducts");

      console.log("Response:", updatedProduct.data);
    } catch (err) {
      console.error("Errore:", err);
      setError(
        err.response?.data?.message ||
          "Errore durante l'aggiornamento del prodotto"
      );
      alert(
        err.response?.data?.message ||
          "Errore durante l'aggiornamento del prodotto"
      );
    }
  };

  return (
    <>
      <Button className="swiper_button" onClick={handleShow}>
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
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
              <Form.Group
                className="mb-3 d-flex justify-content-center gap-5"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  type="checkbox"
                  label="Male"
                  value={"Male"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Female"
                  value={"Female"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Kid"
                  value={"Kids"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                 <Form.Check
                  type="checkbox"
                  label="Unisex"
                  value={"Unisex"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
            </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Category</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select a category</option>
                <option value="shirts">Shirts</option>
                <option value="shoes">Shoes</option>
                <option value="shorts">Shorts</option>
                <option value="socks">Socks</option>
                <option value="balls">Balls</option>
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
                  style={{ maxWidth: "200px" }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
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
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseFloat(e.target.value),
                      })
                    }
                    placeholder="£"
                    required
                    min="0"
                    step="0.01"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Condition</Form.Label>
              <Form.Select
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                required
              >
                <option value="">State of your product</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Size</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                required
              >
                {formData.category === "shirts" ||
                formData.category === "shorts" ||
                formData.category === "socks" ? (
                  <>
                    <option value="">Select</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </>
                ) : formData.category === "balls" ? (
                  <>
                    <option value="">Select</option>
                    <option value="3">Size 3</option>
                    <option value="4">Size 4</option>
                    <option value="5">Size 5</option>
                  </>
                ) : (
                  <>
                    <option value="">Select</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                  </>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                required
              >
                <option value="">Select</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
                <option value="Errea">Errea</option>
                <option value="Mizuno">Mizuno</option>
                <option value="Kappa">Kappa</option>
                <option value="Joma">Joma</option>
                <option value="Diadora">Diadora</option>
                <option value="Diadora">Umbro</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex gap-3">
              <Button className="submit-button" type="submit">
                Save
              </Button>
              <Button
                variant="dark"
                onClick={handleClose}
                style={{
                  border: "2px solid #2eff60",
                }}
              >
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProduct;
