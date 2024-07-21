import React from "react";
import Initial_Products from "../Mocks/products.json";
import UseFilters from "../Hokks/UseFilters";

import TableProducts from "./TableProducts";
import { Box } from "@mui/material";
import FiltersProductsBox from "./FiltersProductsBox";

const Products = () => {
  const { filterProducts } = UseFilters();

  const filtered_products = filterProducts(Initial_Products.products);

  return (
    <>
      <FiltersProductsBox />
      <Box
        sx={{
          width: "98%",
          display: "table",
          tableLayout: "fixed",
          margin: { xs: "4px", sm: "10px" },
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <TableProducts list_products={filtered_products} />
      </Box>
    </>
  );
};

export default Products;
