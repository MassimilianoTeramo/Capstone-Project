import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { VscAccount } from "react-icons/vsc";
import { useCart } from "../context/CartContext"; //carrello
import { BiCart } from "react-icons/bi";

const CustomNavbar = () => {
  const items = useCart(); //carrello
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
    <Navbar bg="dark" expand="lg" className="custom-navbar d-flex gap-2 align-items-center">
      <Container className="d-flex align-items-center">
        <Navbar.Brand as={Link} to="/" className="brand-text">
          FootShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar-scroll" className="d-flex align-items-center">
          <div className="mx-auto d-flex gap-2 justify-content-center align-items-center">
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
                as={Link}
                to="/products/category/shirts"
                className="dropdown_custom"
              >
                T-Shirts
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/category/shorts"
                className="dropdown_custom"
              >
                Shorts
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/category/socks"
                className="dropdown_custom"
              >
                Socks
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/category/shoes"
                className="dropdown_custom"
              >
                Shoes
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/category/balls"
                className="dropdown_custom"
              >
                Balls
              </NavDropdown.Item>
            </NavDropdown>

            {user && (
              <>
                <Nav.Link
                  as={Link}
                  to="/myproducts"
                  className="nav-link-custom"
                >
                  My Products
                </Nav.Link>
              </>
            )}
            <NavDropdown
              title="Brands"
              className="dropdown-navbar"
              data-bs-theme="dark"
              style={{ color: "white" }}
            >
              <NavDropdown.Item
                as={Link}
                to="/products/brand/Nike"
                className="dropdown_custom"
              >
                Nike
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/brand/Adidas"
                className="dropdown_custom"
              >
                Adidas
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/brand/Puma"
                className="dropdown_custom"
              >
                Puma
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/brand/Errea"
                className="dropdown_custom"
              >
                Errea
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/brand/Mizuno"
                className="dropdown_custom"
              >
                Mizuno
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/brand/Kappa"
                className="dropdown_custom"
              >
                Kappa
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/brand/Joma"
                className="dropdown_custom"
              >
                Joma
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/products/brand/Diadora"
                className="dropdown_custom"
              >
                Diadora
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        
            <Button  //bottone CArrello
              className="card_button mx-3 mt-0"
              style={{width:"100px"}}
              onClick={() => navigate(`/CartPage`)}>
              <BiCart size={24}/> {items.lenght}
            </Button>
          
          <div>
            {user ? (
              <>
                <NavDropdown
                  title={
                    <span
                      style={{
                        color: "rgb(255, 255, 255)",
                        fontWeight: "500",
                      }}
                    >
                      {user?.firstName ? user.firstName : "Guest"}
                    </span>
                  }
                  id="basic-nav-dropdown"
                  className="navbar_dropdown"
                  data-bs-theme="dark"
                >
                  <NavDropdown.Item
                    className="dropdown_custom"
                    as={Link}
                    to="/products/create"
                  >
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="products/create"
                    className="dropdown_custom"
                  >
                    Sell Product
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/wishlist"
                    className="dropdown_custom"
                  >
                    Wish List
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} style={{}}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="dropdown_custom"
                ></Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown
                  title={
                    <VscAccount
                      style={{ fontSize: "25px", color: "#2eff60" }}
                    />
                  }
                  className="dropdown-navbar"
                  data-bs-theme="dark"
                  style={{ color: "white" }}
                >
                  <Nav.Link as={Link} to="/login" className="nav-link-custom">
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/register"
                    className="nav-link-custom"
                  >
                    Register
                  </Nav.Link>
                </NavDropdown>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
