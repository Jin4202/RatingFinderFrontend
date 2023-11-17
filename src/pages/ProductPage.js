import React, { useContext, useEffect, useState } from "react";

import UserReview from "../components/UserReview/UserReview";
import Review from "../components/Review/Review";
import { Link, useLocation, useParams } from "react-router-dom";
import useAPIService from "../service/useAPIService";
import {
  getProductById,
  getReviewForProduct,
  getUserReviewForProduct,
  searchProduct,
} from "../service/APIService";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";
import CarouselCards from "../components/CarouselCards";
import AuthContext from "../contexts/AuthContext";

/**
 * This page contains:
 * - Product Information
 * - Professioanl Review Summaries
 * - User Reviews
 * - Carousel of Similar Products
 * - Review Form
 * @returns Product Page
 */
export default function ProductPage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [similarProducts, setSimilarProducts] = useState();

  // const product = useLocation().state;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const [loading, data, error] = useAPIService(
  //   () => getUserReviewForProduct(id),
  //   [id]
  // );

  const [reviewLoading, reviewData, reviewError] = useAPIService(
    () => getReviewForProduct(id),
    [id]
  );

  const [productLoading, product, productError] = useAPIService(
    () => getProductById(id),
    [id]
  );

  const handleReviewUpdate = (e) => {
    axios
      .get(`http://localhost:8080/product/${id}/userReview`)
      .then((response) => {
        console.log("response", response);
        setLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/product/${id}/userReview`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //Get similar products
  useEffect(() => {
    if (product) {
      const brand = product.name.split(" ")[0];
      axios
        .get(`http://localhost:8080/search/keyword?keyword=${brand}`)
        .then((response) => {
          const similar = response.data.filter(
            (item) => item.type == product.type && item.name != product.name
          );
          setSimilarProducts(similar);
          console.log("similar", similar);
        })
        .catch(console.log(error));
    }
  }, [product]);

  const whatHifi = () => {
    const arr = reviewData
      .filter((element) => element.company === "What HiFi")
      .map((element, index) => {
        return <Review review={element} key={index} />;
      });

    return (
      <div>
        <h1>WhatHifi</h1>
        {arr.length > 0 ? arr : <p>No data review for this product</p>}
      </div>
    );
  };

  const techRadar = () => {
    const arr = reviewData
      .filter((element) => element.company === "TechRadar")
      .map((element, index) => {
        return <Review review={element} key={index} />;
      });
    return (
      <div>
        <h1>TechRadar</h1>
        {arr.length > 0 ? arr : <p>No data review for this product</p>}
      </div>
    );
  };

  return (
    <div className="product-page-container container">
      {productError ? (
        <p>ERROR IN LOADING PRODUCT</p>
      ) : productLoading ? (
        <p>Loading...</p>
      ) : (
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
      )}

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

      {(similarProducts != null && similarProducts.length > 0) && (
        <div className="similar-container container">
          <h2>Similar Products</h2>
          <CarouselCards products={similarProducts} />
        </div>
      )}

      <div className="create-review">
        {user ? (
          <ReviewForm />
        ) : (
          <div className="container">
            <h3>What do you think</h3>

            <Link to="/signup">
              <button>Write a review</button>
            </Link>
          </div>
        )}
      </div>

      <div className="user-reviews-container container">
        {loading ? (
          <p>LOADING USER REVIEWS...</p>
        ) : error ? (
          <p>ERROR IN LOADING USER REVIEWS</p>
        ) : data.length > 0 ? (
          <div>
            {data.map((element) => {
              return <UserReview userReview={element} handleReviewUpdate={handleReviewUpdate}/>;
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
