import { useContext } from "react";
import { FiltersContext } from "../Context/Filter";

const UseFilters = () => {
  const { filters, setFilters } = useContext(FiltersContext);

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        product.price <= filters.minPrice &&
        (filters.category === "All" || product.category === filters.category) &&
        (filters.store === "All" || product.store === filters.store)
      );
    });
  };

  return { filters, filterProducts, setFilters };
};

export default UseFilters;
