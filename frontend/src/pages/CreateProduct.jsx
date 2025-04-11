import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import api from "../utils/api"; // Assicurati di avere il percorso corretto per l'API

const CreateProduct = () => {
  const { user } = useAuth(); // Retrieve the logged-in user from AuthContext

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    size: "",
    condition: "",
    brand: "",
    author: user ? user.firstName + user.lastName : "", // Set the author to the logged-in user's first name
    gender: "",
  });

  const [productImg, setProductImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImg(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user || !user._id) {
        setError("Log in to start selling");
        return;
      }

      if (!productImg) {
        setError("L'immagine di copertina è obbligatoria");
        return;
      }

      const sentForm = new FormData();
      sentForm.append("title", formData.title);
      sentForm.append("description", formData.description);
      sentForm.append("price", formData.price);
      sentForm.append("category", formData.category);
      sentForm.append("author", user._id);
      sentForm.append("condition", formData.condition);
      sentForm.append("size", formData.size);
      sentForm.append("brand", formData.brand);
      sentForm.append("image", productImg);
      sentForm.append("gender", formData.gender);

      // Log dei dati inviati
      console.log("Form data:", {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        size: formData.size,
        image: productImg,
        condition: formData.condition,
        brand: formData.brand,
        gender: formData.gender,
      });

      const response = await api.post(
        `${process.env.REACT_APP_API_URL}/products`,
        sentForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      navigate("/myproducts");
    } catch (err) {
      console.error("Error creating product:", err);
      setError(
        err.response?.data?.message ||
          "Errore durante la creazione del prodotto"
      );
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
              <Form.Label>Title</Form.Label>
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
                  value={"Men"}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Female"
                  value={"Women"}
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
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select</option>
                <option value="shirts">T-Shirts</option>
                <option value="shorts">Shorts</option>
                <option value="shoes">Shoes</option>
                <option value="socks">Socks</option>
                <option value="balls">Balls</option>
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
                  style={{ maxWidth: "200px" }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
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
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="£"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Condition</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={formData.condition}
                onChange={(e) =>
                  setFormData({ ...formData, condition: e.target.value })
                }
                required
              >
                <option value="">Select</option>
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
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
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
              </Form.Select>
            </Form.Group>
            <Button className="submit-button" variant="primary" type="submit">
              Publish it!
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProduct;
