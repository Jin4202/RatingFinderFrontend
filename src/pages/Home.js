import React from "react";
import ProductCatalog from "./ProductCatalog";
import FilterForm from "../components/FilterForm";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="d-flex flex-row container">
      <FilterForm />
      <div className="show-all w-25">
        <Link to="/product?pageNumber=1">
          <button type="button">View All Products</button>
        </Link>
      </div>
    </div>
  );
}
