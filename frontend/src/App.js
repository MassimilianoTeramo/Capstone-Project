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
import './styles/App.css';
import CreateProduct from "./pages/CreateProduct";
import ProductsCard from "./components/ProductsCard";
import MyProducts from "./pages/MyProducts";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import ConditionPage from "./pages/ConditionPage";
import BrandPage from "./pages/BrandPage";
import WishList from "./pages/WishList";
import CartPage from "./pages/CartPage";
import Profile from "./pages/MyProfile";
import {WishProvider} from "./context/WishListContext";


function App() {
  return (
    <Router>
      <AuthProvider>
      <WishProvider>
        <CustomNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/productsCard" element={<ProductsCard />} /> 
            <Route path="/products" element={<Products />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/products/category/:category" element={<CategoryPage />} /> 
            <Route path="/products/condition/:condition" element={<ConditionPage />} />
            <Route path="/products/brand/:brand" element={<BrandPage />} />
            <Route path="/products/:id" element={<ProductDetails />} /> 
            <Route path="/myproducts" element={<MyProducts />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/profile" element={<Profile />} />
            
          </Routes>
        <Footer />
        </WishProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
