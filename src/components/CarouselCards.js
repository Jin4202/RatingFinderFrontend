import React, { useState } from "react";
import Default_pfp from "../Default_pfp.png";
import Product from "../components/Product/Product";
import { Link } from "react-router-dom";

export default function CarouselCards({ products }) {
  const cardsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const nextSet = () => {
    setCurrentPage(
      (prevPage) => (prevPage + 1) % Math.ceil(products.length / cardsPerPage)
    );
  };

  const prevSet = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0
        ? Math.ceil(products.length / cardsPerPage) - 1
        : prevPage - 1
    );
  };
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  return (
    <div className="card-carousel  d-flex">
      <button type="button" onClick={prevSet}>
        &lt;
      </button>
      <div className="card-container  d-flex flex-wrap">
        {products.slice(startIndex, endIndex).map((product, index) => (
          <Link key={product.name} to={`/product/${product.prod_id}`}>
            <Product product={product} />
          </Link>

          // <div key={startIndex + index} className="card">
          //   {/* Render your card content here */}
          //   <h2>{product.name}</h2>
          //   <p>{product.brand}</p>
          // </div>
        ))}
      </div>
      <button type="button" onClick={nextSet}>
        &gt;
      </button>
    </div>
  );
}
