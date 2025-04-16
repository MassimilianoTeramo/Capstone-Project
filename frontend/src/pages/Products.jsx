import {
  Container,
  Row,
  Col,
  Pagination,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductsCard from "../components/ProductsCard";
import { useWish } from "../context/WishListContext";
import { useDispatchWish } from "../context/WishListContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
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
          `http://localhost:3002/products?page=${currentPage}${user ? `&userId=${user._id}` : ''}`
        );
        setProducts(response.data.products);
        setAllProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setError(null);
        if (response.data.products.length === 0)
          console.log("nessun prodotto trovato");
      } catch (error) {
        setError(error);
        setProducts([]);
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user, currentPage]);

  const handleBtns = (e) => {
    let word = e.target.value;

    /* FILTER BY CATEGORY */
    if (word === "All") {
      setProducts(allProducts);
    } else if (word === "Shirts") {
      const filtered = allProducts.filter((item) => item.category === "shirts");
      setProducts(filtered);
    } else if (word === "Shorts") {
      const filtered = allProducts.filter((item) => item.category === "shorts");
      setProducts(filtered);
    } else if (word === "Shoes") {
      const filtered = allProducts.filter((item) => item.category === "shoes");
      setProducts(filtered);
    } else if (word === "Balls") {
      const filtered = allProducts.filter((item) => item.category === "balls");
      setProducts(filtered);
    } else if (word === "Socks") {
      const filtered = allProducts.filter((item) => item.category === "socks");
      setProducts(filtered);

       /* FILTRO BRAND */
    } else if (word === "Nike") {
      const filtered = allProducts.filter((item) => item.brand === "Nike");
      setProducts(filtered);
    } else if (word === "Adidas") {
      const filtered = allProducts.filter((item) => item.brand === "Adidas");
      setProducts(filtered);
    } else if (word === "Puma") {
      const filtered = allProducts.filter((item) => item.brand === "Puma");
      setProducts(filtered);
    } else if (word === "Errea") {
      const filtered = allProducts.filter((item) => item.brand === "Errea");
      setProducts(filtered);
    } else if (word === "Mizuno") {
      const filtered = allProducts.filter((item) => item.brand === "Mizuno");
      setProducts(filtered);
    } else if (word === "Kappa") {
      const filtered = allProducts.filter((item) => item.brand === "Kappa");
      setProducts(filtered);
    } else if (word === "Joma") {
      const filtered = allProducts.filter((item) => item.brand === "Joma");
      setProducts(filtered);
    } else if (word === "Diadora") {
      const filtered = allProducts.filter((item) => item.brand === "Diadora");
      setProducts(filtered);
    } else if (word === "Umbro") {
      const filtered = allProducts.filter((item) => item.brand === "Umbro");
      setProducts(filtered);
    } else if (word === "Male") {

    /* FILTer BY GENDER */
      const filtered = allProducts.filter((item) => item.gender === "Male");
      setProducts(filtered);
    } else if (word === "Female") {
      const filtered = allProducts.filter((item) => item.gender === "Female");
      setProducts(filtered);
    } else if (word === "Kids") {
      const filtered = allProducts.filter((item) => item.gender === "Kids");
      setProducts(filtered);
    }
  };

  return (
    <>
      <Container className="mt-5">
        {loading && <p>Loading products...</p>}
        {error && <p>An error occurred: {error.message}</p>}
        <div className="d-flex gap-3 mb-4 justify-content-end">
          <div className="d-flex justify-content-end">
            <Button variant="warning" onClick={handleShowFilter}>
              Filter
            </Button>
          </div>
          <Offcanvas
            show={showFilter}
            onHide={handleCloseFilter}
            placement="start"
            className="offcanvasCustom"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filtra per Categoria</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex flex-column gap-2 mb-2">
                <Button
                  className="btnOffcanvas"
                  value="All"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Tutti i Prodotti
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Shirts"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Maglie
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Shorts"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Pantaloncini
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Shoes"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Scarpe
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Balls"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Palloni
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Socks"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Calzini
                </Button>
              </div>
            </Offcanvas.Body>
           
              <Offcanvas.Header>
                <Offcanvas.Title>Filtra per Genere</Offcanvas.Title>
              </Offcanvas.Header>
               <div className="d-flex justify-content-center mb-4">
              <Button
                className="btnOffcanvas"
                value="Male"
                onClick={(e) => {
                  handleBtns(e);
                  handleCloseFilter();
                }}
              >
                Male
              </Button>
              <Button
                className="btnOffcanvas"
                value="Female"
                onClick={(e) => {
                  handleBtns(e);
                  handleCloseFilter();
                }}
              >
                Female
              </Button>
              <Button
                className="btnOffcanvas"
                value="Kids"
                onClick={(e) => {
                  handleBtns(e);
                  handleCloseFilter();
                }}
              >
                Kids
              </Button>
            </div>

            <Offcanvas.Header>
              <Offcanvas.Title>Filtra per Brand</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex flex-column gap-2">
                <Button
                  className="btnOffcanvas"
                  value="All"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Tutti i Brand
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Nike"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Nike
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Adidas"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Adidas
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Puma"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Puma
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Errea"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Errea
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Mizuno"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Mizuno
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Kappa"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Kappa
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Joma"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Joma
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Diadora"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Diadora
                </Button>
                <Button
                  className="btnOffcanvas"
                  value="Umbro"
                  onClick={(e) => {
                    handleBtns(e);
                    handleCloseFilter();
                  }}
                >
                  Umbro
                </Button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
        <Row>
          {!loading && !error && products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id} md={4} className="mb-4">
                <ProductsCard product={product} showActions={true} />
              </Col>
            ))
          ) : (
            <p>No products available</p>
          )}
        </Row>
        {totalPages > 1 && (
          <div>
            <Pagination className="justify-content-center">
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
    </>
  );
};

export default Products;

/*  <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Filtra per Categoria</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="d-flex flex-column gap-2">
                            <Button 
                            className='btnOffcanvas'
                                
                                value="All" 
                                onClick={(e) => {
                                    handleBtns(e);
                                    handleCloseFilter();
                                }}
                            >
                                Tutti i Prodotti
                            </Button>
                            <Button 
                                
                                value="Shirts" 
                                onClick={(e) => {
                                    handleBtns(e);
                                    handleCloseFilter();
                                }}
                            >
                                Maglie
                            </Button>
                            <Button 
                                variant="outline-warning" 
                                value="Shorts" 
                                onClick={(e) => {
                                    handleBtns(e);
                                    handleCloseFilter();
                                }}
                            >
                                Pantaloncini
                            </Button>
                            <Button 
                                variant="outline-warning" 
                                value="Shoes" 
                                onClick={(e) => {
                                    handleBtns(e);
                                    handleCloseFilter();
                                }}
                            >
                                Scarpe
                            </Button>
                            <Button 
                                variant="outline-warning" 
                                value="Balls" 
                                onClick={(e) => {
                                    handleBtns(e);
                                    handleCloseFilter();
                                }}
                            >
                                Palloni
                            </Button>
                            <Button 
                                variant="outline-warning" 
                                value="Socks" 
                                onClick={(e) => {
                                    handleBtns(e);
                                    handleCloseFilter();
                                }}
                            >
                                Calzini
                            </Button>
                        </div>
                    </Offcanvas.Body> */
