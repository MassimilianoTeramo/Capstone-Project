import { useState, useEffect } from "react";
import { Col, Pagination, Container, Row, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductsCard from "../components/ProductsCard";
import { Alert } from "react-bootstrap";
import api from "../utils/api";
import FilterComponent from "../components/FilterComponent";
import { motion } from "framer-motion";

const ConditionPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { condition } = useParams();
  console.log("Condition parameter:", condition); // Debugging log
  const { user } = useAuth();
  const userName = user ? `${user.firstName} ${user.lastName}` : "unknown";
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const getProductsByCondition = async () => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_URL}/products/condition/${condition}`
      );
      console.log("Response from API:", response.data); // Debugging log

      console.log("Products fetched:", response.data); // Debugging log
      setProducts(response.data);
      setError(null);
      setLoading(false);
      setTotalPages(response.data.totalPages);
      return response.data; // Restituisce i prodotti
    } catch (error) {
      console.error("Errore nel recupero dei prodotti per categoria:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCondition();
        setProducts(data);
        setLoading(false);
        setError("");
      } catch (err) {
        setError("Errore nel recupero dei prodotti");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [condition]);

  const handleCloseFilter = () => setShowFilter(false);
  const handleShowFilter = () => setShowFilter(true);

  if (loading)
    return (
      <Container className="mt-4">
        <p>Loading...</p>
      </Container>
    );
  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <div className="d-flex flex-row-reverse gap-3 mb-4 justify-content-between align-items-center">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant="warning" onClick={handleShowFilter}>
            Filter
          </Button>
        </motion.div>

        <FilterComponent
          showFilter={showFilter}
          handleCloseFilter={handleCloseFilter}
          allProducts={allProducts}
          setProducts={setProducts}
        />
        <h4
          className="my-4 font-label fw-bold text-warning"
          style={{ fontFamily: "Anek Odia", fontSize: "30px" }}
        >
          Give a look to our {condition} stuff
        </h4>
      </div>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} lg={3} md={4} className="mb-4">
              <ProductsCard product={product} showActions={true} />
            </Col>
          ))
        ) : (
          <Col>
            <p>You haven't published any post yet!</p>
          </Col>
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
      <div className="d-flex justify-content-center">
        <Button
          variant="warning"
          className="my-4"
          onClick={() => navigate("/products")}
        >
          Go to All Products
        </Button>
      </div>
    </Container>
  );
};

export default ConditionPage;
