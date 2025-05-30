import { Button, Offcanvas } from "react-bootstrap";
import { handleFilter } from "../utils/filterUtils";

const FilterComponent = ({
  showFilter,
  handleCloseFilter,
  allProducts,
  setProducts,
  hideBrandFilter,
}) => {
  const handleBtns = (e) => {
    handleFilter(e, allProducts, setProducts);
  };

  return (
    <Offcanvas
      show={showFilter}
      onHide={handleCloseFilter}
      placement="start"
      className="offcanvasCustom"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter per gender</Offcanvas.Title>
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
        <Offcanvas.Title>Filter per category</Offcanvas.Title>
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
            All products
          </Button>
          <Button
            className="btnOffcanvas"
            value="Shirts"
            onClick={(e) => {
              handleBtns(e);
              handleCloseFilter();
            }}
          >
            T-Shirts
          </Button>
          <Button
            className="btnOffcanvas"
            value="Shorts"
            onClick={(e) => {
              handleBtns(e);
              handleCloseFilter();
            }}
          >
            Shorts
          </Button>
          <Button
            className="btnOffcanvas"
            value="Shoes"
            onClick={(e) => {
              handleBtns(e);
              handleCloseFilter();
            }}
          >
            Shoes
          </Button>
          <Button
            className="btnOffcanvas"
            value="Balls"
            onClick={(e) => {
              handleBtns(e);
              handleCloseFilter();
            }}
          >
            Balls
          </Button>
          <Button
            className="btnOffcanvas"
            value="Socks"
            onClick={(e) => {
              handleBtns(e);
              handleCloseFilter();
            }}
          >
            Socks
          </Button>
        </div>
      </Offcanvas.Body>

      {!hideBrandFilter && (
        <>
          <Offcanvas.Header>
            <Offcanvas.Title>Filter per brand</Offcanvas.Title>
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
                All brands
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
        </>
      )}
    </Offcanvas>
  );
};

export default FilterComponent;
