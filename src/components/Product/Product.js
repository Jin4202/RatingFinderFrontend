import React from "react";
import "./Star";

import "./product.css";
export default function Product({ product }) {

  return (
    <div className="product-card-container card m-2">
      <div className="img-container">
        <img
          src={`data:image/jpg;base64,${product.image}`}
          alt={`${product.name}`}
        />
      </div>
      <div className="product-info">
        <h3 className="card-title">{product.name}</h3>

        

        <div className="star-rating">
          {[...Array(5)].map((element, index) => {
            if (index < product.rating) {
              return <span className="on" key={index}>&#9733;</span>;
            }
            return <span className="off" key={index}>&#9733;</span>;
          })}
        </div>

        {product.price !== 0 && product.price !== null && (
          <p>${product.price}</p>
        )}
      </div>
    </div>
  );
}
