import { useEffect, useState } from "react";
import { Form, Button, Alert, Col, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import api from "../utils/api";
import { motion, spring } from "framer-motion";
import bgform3 from "../uploads/bgform3.jpg";

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

const Popup = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom,
    },
  }),
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Tentativo di login con:", { email });
      const response = await api.post("/auth/login", { email, password });
      console.log("Risposta dal server:", response.data);
      console.log("Risposta dal server:", response.data.user);
      console.log("Risposta dal server:", response.data.token);
      const { user, token } = response.data;
      login(user, token);
      alert(`Hi ${user.firstName}! You are in!`);
      navigate("/");
    } catch (err) {
      console.error("Errore dettagliato:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setError(err.response?.data?.message || "Errore durante il login");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("jwt");

    if (token) {
      try {
        api
          .get("auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            login(response.data.user, token);
            console.log(response.data.user);
            console.log(token);
            alert("hi there");
            navigate("/");
          })
          .catch((error) => {
            setError(
              error.response?.data?.message ||
                "Errore di autenticazione con Google"
            );
          });
      } catch (error) {
        setError("Errore di autenticazione con Google");
      }
    }
  }, [login, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3002/auth/google";
    console.log("Login con Google avviato");
    console.log(process.env.REACT_APP_API_URL);
    console.log(process.env.REACT_APP_API_URL + "/auth/google");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgform3})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        width: "auto",
        minHeight: "35rem",
        marginTop: "-10px",
      }}
      className="py-5"
    >
      <Container className="pt-5">
        <Row className="justify-content-center">
          <Col
            md={6}
            xs={12}
            className="p-4 d-flex flex-column justify-content-center "
          >
            <motion.h2
              variants={TitleAn}
              initial="initial"
              animate="animate"
              className="text-center mt-4"
              style={{ fontFamily: "Anek Odia", fontSize: "40px" }}
            >
              Login
            </motion.h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <motion.div
                variants={InputRight}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.4,
                  duration: 0.2,
                  type: spring,
                  stiffness: 100,
                }}
              >
                <Form.Group className="mb-4" controlId="email">
                  <Form.Label className="form-label text-white">
                    Email
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    type="email"
                    value={email}
                    placeholder="Insert your email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    style={{ background: "rgba(255, 255, 255, 0.5)" }}
                  />
                </Form.Group>
              </motion.div>
              <motion.div
                variants={InputLeft}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: 0.8,
                  duration: 0.2,
                  type: spring,
                  stiffness: 100,
                }}
              >
                <Form.Group className="mb-5" controlId="password">
                  <Form.Label className="form-label text-white">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ background: "rgba(255, 255, 255, 0.5)" }}
                  />
                </Form.Group>
              </motion.div>
              <div className="d-flex justify-content-center align-items-center gap-4">
                <motion.div
                  variants={Popup}
                  initial="hidden"
                  animate="visible"
                  custom={1.5}
                  transition={{
                    duration: 0.2,
                    type: spring,
                    stiffness: 100,
                  }}
                >
                  <Button
                    type="submit"
                    style={{
                      background: "linear-gradient(to right, blue, red)",
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      width: "5rem",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                    className="mb-5 mt-2"
                  >
                    Login
                  </Button>
                </motion.div>

                <motion.div
                  variants={Popup}
                  initial="hidden"
                  animate="visible"
                  custom={2.1}
                  transition={{
                    duration: 0.1,
                    type: spring,
                    stiffness: 100,
                  }}
                >
                  <Button
                    onClick={handleGoogleLogin}
                    className="submit-button mb-5 mt-2"
                    style={{
                      backgroundColor: "red",
                      gap: "10px",
                      width: "5rem",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid red",
                    }}
                  >
                    <FaGoogle />
                  </Button>
                </motion.div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
