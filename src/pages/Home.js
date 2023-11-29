import React, { useContext } from "react";
import ProductCatalog from "./ProductCatalog";
import FilterForm from "../components/FilterForm";
import { Link } from "react-router-dom";
import Searchbar from "../components/Searchbar";
import AuthContext from "../contexts/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex flex-row container">
      <h1>Hello {user ? user.user.username : "Guest"}</h1>

      <FilterForm />
      <div className="show-all w-25">
        <Link to="/product?pageNumber=1">
          <button type="button" className="btn btn-primary">View All Products</button>
        </Link>
      </div>
    </div>
  );
}
