import React from "react";
import "./Star";

import "./product.css";
export default function Product({ product }) {
  const containerStyle = {
    width: "20rem",
    height: "20rem",
  };
  return (
    <div className="product-card-container card m-2" style={containerStyle}>
      <div className="img-container">
        <img
          src={`data:image/jpg;base64,${product.image}`}
          alt={`${product.name}`}
          className="card-img-top "
        />
      </div>
      <div className="product-info p-2">
        <h3 className="card-title">{product.name}</h3>

        <div className="star-rating">
          {[...Array(5)].map((element, index) => {
            if (index < product.rating) {
              return (
                <span className="on" key={index}>
                  &#9733;
                </span>
              );
            }
            return (
              <span className="off" key={index}>
                &#9733;
              </span>
            );
          })}
        </div>

        {product.price !== 0 && product.price !== null && (
          <p>${product.price}</p>
        )}
      </div>
    </div>
  );
}
