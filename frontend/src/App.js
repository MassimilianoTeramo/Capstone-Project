import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./context/AuthContext";
import CustomNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import './App.css';
import CreateProduct from "./pages/CreateProduct";
import ProductsCard from "./components/ProductsCard";
import MyProducts from "./pages/MyProducts";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CustomNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/productsCard" element={<ProductsCard />} /> 
            <Route path="/myproducts" element={<MyProducts />} />
            <Route path="/products/:id" element={<ProductDetails />} /> 
            <Route path="/products/category/:category" element={<ProductDetails />} /> 
            {/* <Route path="/profile" element={<Profile />} />

            
            <Route path="/productElement" element={<ProductElement />} />
            */}
          </Routes>
        </Container>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
