import { Container, Row, Col, Pagination, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductsCard from "../components/ProductsCard";
import { useWish } from "../context/WishListContext";
import { useDispatchWish } from "../context/WishListContext";
import FilterComponent from "../components/FilterComponent";
import { motion } from "framer-motion";
import brandBg from "../uploads/b7.jpg";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { user } = useAuth();
  const likedProducts = useWish();
  const dispatchWish = useDispatchWish();

  // Funzione per resettare tutti i filtri
  const resetFilters = () => {
    setSelectedGender(null);
    setSelectedPrice(null);
    setSelectedCategory(null);
    setSelectedBrand(null);
    setProducts(allProducts);
    setCurrentPage(1);
    setFilteredProducts(allProducts);
  };

  // Resetta i filtri quando il componente viene montato
  useEffect(() => {
    resetFilters();
  }, []);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3002/products?${
            user ? `&userId=${user._id}` : ""
          }`
        );
        setProducts(response.data.products);
        setAllProducts(response.data.products);
        setFilteredProducts(response.data.products); 
        console.log(response.data.products);
        setTotalPages(response.data.totalPages);
        setError(null);
        if (response.data.products.length === 0)
          console.log("nessun prodotto trovato");
      } catch (error) {
        setError(error);
        setProducts([]);
        setAllProducts([]);
        setFilteredProducts([]);

        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * 12;
    const endIndex = startIndex + 12;
    setProducts(products.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredProducts.length / 12));
  }, [filteredProducts, currentPage])

  return (
    <div
      style={{
        backgroundImage: `url(${brandBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        width: "auto",
        height: "auto",
        marginTop: "-10px",
      }}
    >
      <Container className="py-5">
        {loading && <p>Loading products...</p>}
        {error && <p>An error occurred: {error.message}</p>}
        <div className="d-flex gap-3 mb-4 justify-content-between">
          <motion.div
            initial={{ x: "-100vh", opacity: 0 }}
            animate={{
              fontSize: "50px",
              x: 0,
              opacity: 1,
              color: "gold",
              letterSpacing: "5px",
            }}
            transition={{
              duration: 3,
              type: "spring",
              stiffness: 50,
              mass: "2",
              dumpling: "6",
            }}
          >
            <h3>All Products</h3>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="warning" onClick={handleShowFilter}>
              Filter
            </Button>
          </motion.div>

          <FilterComponent
            showFilter={showFilter}
            handleCloseFilter={handleCloseFilter}
            setFilteredProducts={setFilteredProducts}
            allProducts={allProducts}
            setProducts={setProducts}
            resetFilters={resetFilters}
          />
        </div>
        <Row>
          {!loading && !error && products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id} lg={3} md={4} className="mb-4">
                <ProductsCard product={product} showActions={true} />
              </Col>
            ))
          ) : (
            <p>No products available</p>
          )}
        </Row>
        {totalPages > 1 && (
          <div>
            <Pagination className="justify-content-center gap-1">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </Pagination>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Products;
