import { useState } from "react";
import { Form, Button, Alert, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { motion, spring } from "framer-motion";

const TitleAn = {
  initial: { y: "-200vh", opacity: 0 },
  animate: {
    y: 0,
    fontSize: "50px",
    opacity: 1,
    color: "gold",
    letterSpacing: "5px",
  },
  transition: { duration: 1, type: "spring", bounceStiffness: 10 },
  when: "beforeChildren",
};

const InputLeft = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};
const InputRight = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validazione
    if (formData.password !== formData.confirmPassword) {
      setError("Wrong Credentials");
      return;
    }

    try {
      const response = await api.post("http://localhost:3002/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      const { user, token } = response.data;
      login(user, token);
      navigate("/");
    } catch (err) {
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container className="d-flex flex-column text-center my-5">
      <Row className="justify-content-center mt-5">
        <Col md={6} xs={12}>
          <motion.h2
            variants={TitleAn}
            initial="initial"
            animate="animate"
            className="mb-4"
            style={{fontFamily:"Anek Odia"}}
          >
            Register
          </motion.h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <motion.div
              variants={InputRight}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.2,
                duration: 0.1,
                type: spring,
                stiffness: 100,
              }}
            >
              <Form.Group className="mb-3  formLabel">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </motion.div>
            <motion.div
              variants={InputLeft}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 1,
                duration: 0.1,
                type: spring,
                stiffness: 100,
              }}
            >
              <Form.Group className="mb-3  formLabel formLabel">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </motion.div>
            <motion.div
              variants={InputRight}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 1.5,
                duration: 0.1,
                type: spring,
                stiffness: 100,
              }}
            >
              <Form.Group className="mb-3  formLabel">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </motion.div>
            <motion.div
              variants={InputLeft}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 2,
                duration: 0.1,
                type: spring,
                stiffness: 100,
              }}
            >
              <Form.Group className="mb-3  formLabel">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Are you a...?</option>
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                </Form.Select>
              </Form.Group>
            </motion.div>
            <motion.div
              variants={InputRight}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 2.5,
                duration: 0.1,
                type: spring,
                stiffness: 100,
              }}
            >
              <Form.Group className="mb-3  formLabel">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
            </motion.div>
             <motion.div
                          variants={InputLeft}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: 3, duration: 0.1, type:"spring", stiffness:100 }}
                        >
            <Form.Group className="mb-3  formLabel">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            </motion.div>
            <Button type="submit" className="submit-button mt-4" variant="warning">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
