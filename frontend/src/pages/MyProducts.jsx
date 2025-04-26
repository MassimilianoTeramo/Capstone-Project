import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductsCard from "../components/ProductsCard";
import { Container, Alert, Row, Col, Pagination} from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from "../utils/api"; // Assicurati di avere il percorso corretto per l'API
import { motion } from "framer-motion";
import brandBg from "../uploads/b7.jpg";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useAuth();
  const { token } = useAuth();
  const { id } = useParams();

  const getMyProducts = async () => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_API_URL}/products/myproducts`
      ); // Usa l'istanza Axios configurata
      console.log(response.data);
      return response.data; // Restituisci i prodotti
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Errore nel recupero dei prodotti per autore:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getMyProducts();

        setProducts(response);
        setError("");
      } catch (error) {
        setError("Error fetching products");
        console.log(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user, token]);

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
   <div
         style={{
           backgroundImage: `url(${brandBg})`,
           backgroundSize: "cover",
           backgroundRepeat: "no-repeat",
           backgroundPosition: "center",
           backgroundOpacity: "0.2",
           backgroundBlendMode: "darken",
           width: "auto",
           height: "auto",
           marginTop: "-10px",
           
         }}
       >
    <Container className="pt-4">
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
        className="my-5 fw-bold"
      >
        <h3 style={{ fontFamily: "Anek Odia" }}>MY PRODUCTS</h3>
      </motion.div>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} lg={3} md={4} sm={12} className="mb-4">
              <ProductsCard product={product} showActions={true} />
            </Col>
          ))
        ) : (
          <Col>
            <p>You haven't advertised any product yet!</p>
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
    </Container>
    </div>
  );
};
export default MyProducts;
