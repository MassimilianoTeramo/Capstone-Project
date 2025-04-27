export const handleFilter = (e, allProducts, setProducts) => {
  const word = e.target.value;

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
