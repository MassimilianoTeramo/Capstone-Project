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
    <Navbar bg="dark" expand="lg" className="custom-navbar">
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
              <NavDropdown
                title="Products"
                id="basic-nav-dropdown"
                className="dropdown-navbar"
                data-bs-theme="dark"
                style={{ color: "white" }}
               
              >
                <NavDropdown.Item
                  as={Link} to="/products/category/shirts" className="dropdown_custom">
                T-Shirts
              </NavDropdown.Item >
              <NavDropdown.Item  as={Link} to="/products/category/shorts" className="dropdown_custom">
                Shorts
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/products/category/socks" className="dropdown_custom">
                Socks
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/products/category/shoes" className="dropdown_custom">
                Shoes
              </NavDropdown.Item>
              </NavDropdown>

             
               {user && (
                 <>
              <Nav.Link as={Link} to="/myproducts" className="nav-link-custom">
                My Products
              </Nav.Link>
              </>
              )}
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
          {user ? (
              <>
               <NavDropdown
                 title={
                   <span style={{ 
                    color: "rgb(255, 255, 255)",
                    fontWeight: "500",
                    }}>
                     {user?.firstName ? user.firstName : "Guest"}
                   </span>
                 }
                 id="basic-nav-dropdown"
                 className="navbar_dropdown"
                 data-bs-theme="dark"
               >
              <NavDropdown.Item 
                className="dropdown_custom"
                as={Link} to="/products/create"
                >My Profile</NavDropdown.Item>
              <NavDropdown.Item 
              as={Link} to="products/create"
              className="dropdown_custom">
                Sell Product
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="dropdown_custom">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} style={{}}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
                <Nav.Link as={Link} to="/profile" className="dropdown_custom">
                  
                </Nav.Link>
    
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
