import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { VscAccount } from "react-icons/vsc";
import { useCart } from "../context/CartContext";
import { BiCart } from "react-icons/bi";
import { useWish } from "../context/WishListContext";
import api from "../utils/api";
import { useDispatchWish } from "../context/WishListContext";
import logo1 from "../uploads/logo1.png";
import { motion } from "framer-motion";

const svgVariants = {
  hidden: {
    rotate: 0,
  },
  visible: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 4, ease: "linear" },
  },
};

const CustomNavbar = () => {
  const items = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatchWish();

  // Calcola il totale degli articoli considerando le quantità, item.quantity se piu di 1 o 1 se null
  const totalItems = items.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  useEffect(() => {
    if (user) {
      api
        .get(`${process.env.REACT_APP_API_URL}/wishlist`)
        .then((response) => dispatch({ type: "UPDATE", items: response.data }))
        .catch((error) => console.error(error));
    }
  }, [user]);

  return (
     <Navbar bg="dark" expand="lg" className="custom-navbar">
      <Container>
        <motion.div style={{width:"5rem"}}>
          <motion.img 
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            src={logo1} 
            alt="logo" 
            className="logo"
            />
          </motion.div>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          FootballShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <NavDropdown
              title="Products"
              id="products-dropdown"
              className="dropdown-navbar"
            >
              <NavDropdown.Item as={Link} to="/products/category/shirts">
                T-Shirts
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/category/shorts">
                Shorts
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/category/socks">
                Socks
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/category/shoes">
                Shoes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/category/balls">
                Balls
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products">
                All products
              </NavDropdown.Item>
            </NavDropdown>

            {user && (
              <Nav.Link as={Link} to="/myproducts" className="nav-link-custom">
                My Products
              </Nav.Link>
            )}

            <NavDropdown
              title="Brands"
              id="brands-dropdown"
              className="dropdown-navbar"
            >
              <NavDropdown.Item as={Link} to="/products/brand/Nike">
                Nike
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/brand/Adidas">
                Adidas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/brand/Puma">
                Puma
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/brand/Errea">
                Errea
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/brand/Mizuno">
                Mizuno
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/brand/Kappa">
                Kappa
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/brand/Joma">
                Joma
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/brand/Diadora">
                Diadora
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/brand/Umbro">
                Umbro
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav className="ms-auto d-flex">
            <motion.div 
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.9 }}
            className="mt-1">
              <Button
                className="cart-button me-3"
                variant="warning"
                onClick={() => navigate("/CartPage")}
              >
                <BiCart size={24} /> {totalItems}
              </Button>
            </motion.div>
            <div className="cart-user">
              {user ? (
                <NavDropdown
                  title={
                    <span className="user-dropdown-title">
                      {user.firstName || "Guest"}
                    </span>
                  }
                  id="user-dropdown"
                  className="dropdown-navbar"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/products/create">
                    Sell Product
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/wishlist">
                    Wish List
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title={<VscAccount className="account-icon" />}
                  id="auth-dropdown"
                  className="dropdown-navbar"
                >
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">
                    Register
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
