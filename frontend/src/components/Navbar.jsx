import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";

const CustomNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  useEffect(() => {
    // Effettua un aggiornamento del componente quando lo stato dell'utente cambia
  }, [user]);

  return (
    <Navbar bg="dark" expand="lg" className=".custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          FootShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar-scroll">
          <Nav className="me-auto justify-content-around align-items-center">
            <div className="d-flex gap-2 ">
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/products" className="nav-link-custom">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/myproducts" className="nav-link-custom">
                My Products
              </Nav.Link>
            </div>
          </Nav>
          <Nav className="ml-auto justify-content-end align-items-center">
            <Form>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Nav>
          <Nav>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>

              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>

              <Nav.Link as={Link} to="/products/create">
                Sell product 
              </Nav.Link>

              <NavDropdown.Divider />

              <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
