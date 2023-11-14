import React, { useState } from "react";

import UserReview from "../components/UserReview/UserReview";
import Review from "../components/Review/Review";
import { useLocation, useParams } from "react-router-dom";
import useAPIService from "../service/useAPIService";
import {
  getReviewForProduct,
  getUserReviewForProduct,
} from "../service/APIService";
import ReviewForm from "../components/ReviewForm";

export default function ProductPage() {
  const { id } = useParams();
  const product = useLocation().state;

  const [loading, data, error] = useAPIService(
    () => getUserReviewForProduct(id),
    []
  );

  const [reviewLoading, reviewData, reviewError] = useAPIService(
    () => getReviewForProduct(id),
    []
  );

  const whatHifi = () => {
    return (
      <div>
        <h1>WhatHifi</h1>
        {reviewData
          .filter((element) => element.company === "What HiFi")
          .map((element, index) => {
            return <Review review={element} key={index} />;
          })}
      </div>
    );
  };

  const techRadar = () => {
    return (
      <div>
        <h1>TechRadar</h1>
        {reviewData
          .filter((element) => element.company === "TechRadar")
          .map((element, index) => {
            return <Review review={element} key={index} />;
          })}
      </div>
    );
  };

  return (
    <div className="product-page-container container">
      <div className="product-information d-flex">
        <div className="img-container">
          <img
            src={`data:image/jpg;base64,${product.image}`}
            alt={`${product.name}`}
          />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          {product.price > 0 && <h4>${product.price}</h4>}

          <p>5/5</p>
          <h5>{`Brand: ${product.brand}`}</h5>
        </div>
      </div>

      <div className="product-professional-reviews">
        {reviewLoading ? (
          <p>LOADING PROFESSIONAL REVIEWS...</p>
        ) : reviewError ? (
          <p>ERROR IN LOADING PROESSIONAL REVIEW</p>
        ) : (
          <div>
            {whatHifi()}
            {techRadar()}
          </div>
        )}
      </div>

      <div className="create-review">
        <ReviewForm />
      </div>

      <div className="user-reviews-container container">
        {loading ? (
          <p>LOADING USER REVIEWS...</p>
        ) : error ? (
          <p>ERROR IN LOADING USER REVIEWS</p>
        ) : data.length > 0 ? (
          <div>
            {data.map((element) => {
              return <UserReview userReview={element} />;
            })}
          </div>
        ) : (
          <div>
            <h2>No User Reviews for this product</h2>
          </div>
        )}
      </div>
    </div>
  );
}
