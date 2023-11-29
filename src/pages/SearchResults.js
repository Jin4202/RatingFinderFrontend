import React from "react";
import useAPIService from "../service/useAPIService";
import { Link, useSearchParams } from "react-router-dom";
import { searchProduct } from "../service/APIService";
import Product from "../components/Product/Product";
import Searchbar from "../components/Searchbar";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [loading, data, error] = useAPIService(
    () => searchProduct(keyword),
    []
  );

  return (
    <div>
      <h1>{`Searched Results for: ${keyword}`}</h1>
      {error ? (
        <p>ERROR</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-catalog container d-flex flex-wrap">
          {data.map((element) => (
            <Link key={element.name} to={`/product/${element.prod_id}`}>
              <Product product={element} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
