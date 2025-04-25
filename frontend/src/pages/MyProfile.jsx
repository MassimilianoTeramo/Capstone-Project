import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/pDetails.css";
import { motion, spring } from "framer-motion";
import { FaHome } from "react-icons/fa";


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

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.newPassword &&
        formData.newPassword !== formData.confirmPassword
      ) {
        setError("the passwords are different!");
        return;
      }
      const response = await axios.put(
        process.env.REACT_APP_API_BASE_URL + `/users/${user._id}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }
      );

      login(response.data);
      setSuccess("Profile updated!");
      setError("");

      //reset psw fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setTimeout(() => {
        navigate("/");
      }, 3000); // waits for 2 seconds before navigating
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "something went wrong while updating the profile"
      );
      setSuccess("");
    }
  };

  return (
    <Container className="mt-4 text-center">
      <motion.h2
        variants={TitleAn}
        initial="initial"
        animate="animate"
        className="mb-4 titleProfile"
        style={{color:"#ffffffcc"}}
      >
        Manage your Profile
      </motion.h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleProfileUpdate} className="form-container">
            <motion.div
              variants={InputRight}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1, duration: 0.1, type:spring, stiffness:100 }}
            >
              <Form.Group className="mb-3">
                <Form.Label style={{color:"#ffffffcc"}}>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </Form.Group>
            </motion.div>
            <motion.div
              variants={InputLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4, duration: 0.1,  type:spring, stiffness:100}}
            >
              <Form.Group className="mb-3">
                <Form.Label style={{color:"#ffffffcc"}}>Surname</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </Form.Group>
            </motion.div>

            <motion.div
              variants={InputRight}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8, duration: 0.1, type:spring, stiffness:100 }}
            >
            <Form.Group className="mb-3">
              <Form.Label style={{color:"#ffffffcc"}}>email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>
            </motion.div>
            <motion.div
              variants={TitleAn}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.2, duration: 0.1, type:"spring", stiffness:50 }}
            >
            <h4 className="form-label mt-5 mb-4" style={{ fontSize: "20px", color:"gold" }}>
              Change Password
            </h4>
            </motion.div>

            <motion.div
              variants={InputLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.6, duration: 0.1, type:spring, stiffness:100}}
            >
            <Form.Group className="mb-3">
              <Form.Label style={{color:"#ffffffcc"}}>Current Password</Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                onChange={handleChange}
                value={formData.currentPassword}
              />
            </Form.Group>
            </motion.div>
            <motion.div
              variants={InputRight}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2, duration: 0.1, type:spring, stiffness:100 }}
            >
            <Form.Group className="mb-3">
           <Form.Label style={{color:"#ffffffcc"}}>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                onChange={handleChange}
                value={formData.newPassword}
              />
            </Form.Group>
            </motion.div>
            <motion.div
              variants={InputLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2.4, duration: 0.1, type:"spring", stiffness:100 }}
            >
            <Form.Group className="mb-3">
              <Form.Label style={{color:"#ffffffcc"}}>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </Form.Group>
            </motion.div>
            <div className="d-flex justify-content-center gap-4">
            <motion.div
              variants={InputRight}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2.8, duration: 0.1, type:"spring", stiffness:100 }}
            >
            <Button className="submit-button my-4" variant="warning" type="submit">
              Submit
            </Button>
            </motion.div>
            <motion.div
              variants={InputLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 3.2, duration: 0.1, type:"spring", stiffness:100 }}
            ><div className="d-flex justify-content-center">
            <Button variant="warning" className="my-4"
               onClick={() => navigate("/")} >
             <FaHome style={{fontSize: "25px"}}/>
              </Button>
              </div></motion.div>
              </div>
              </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
