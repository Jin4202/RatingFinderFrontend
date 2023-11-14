import axios from "axios";

//File with functions used to make API calls assocaite with getting and posting
// GET - PRODUCTS
export const getAllBrands = () => {
  const promiseBrand = axios
    .get("http://localhost:8080/product/brands")
    .then((response) => {
      console.log("RETURNED DATA");
      return response;
    })
    .catch((error) => {
      console.log(error);
      return new Error("Could not get all brands");
    });
  return promiseBrand;
};

export const getAllProducts = () => {
  const promiseProducts = axios
    .get("http://localhost:8080/product/allProduct")
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return new Error("Failed to fetch all products");
    });

  return promiseProducts;
};

export const getAllProductTypes = () => {
  const promiseType = axios
    .get("http://localhost:8080/product/productType")
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return new Error("Failed to fetch product types");
    });
  return promiseType;
};

export const getProductById = (id) => {
  const promiseProduct = axios
    .get(`http://localhost:8080/product/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return new Error(`Failed to get product by id: ${id}`);
    });
  return promiseProduct;
};

export const getProductByPage = (pageNum) => {
  const promisePage = axios
    .get(`http://localhost:8080/product?page=${pageNum}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return new Error(`Failed to fetch products for page number: ${pageNum}`);
    });
  return promisePage;
};

export const getFilterProducts = (
  pageNumber,
  brands,
  product_type,
  minPrice,
  maxPrice
) => {
  let url = `http://localhost:8080/product?pageNumber=${pageNumber - 1}`;
  if (brands) {
    url += `&brands=${brands}`;
  }
  if (product_type) {
    url += `&product_type=${product_type}`;
  }
  if (minPrice) {
    url += `&minPrice=${minPrice}`;
  }
  if (maxPrice) {
    url += `&maxPrice=${maxPrice}`;
  }
  const promiseFilter = axios
    .get(url)
    .then((response) => response)
    .catch((error) => console.log(error));
  return promiseFilter;
};

// GET -- USER REVIEWS & REVIEWS
export const getUserReviewForProduct = (id) => {
  const promiseUserReview = axios
    .get(`http://localhost:8080/product/${id}/userReview`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return new Error(`Failed to get user review for product ${id}`);
    });
  return promiseUserReview;
};

export const getReviewForProduct = (id) => {
  const promiseReview = axios
    .get(`http://localhost:8080/product/${id}/review`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return new Error(`Failed to get professional review for product: ${id}`);
    });
  return promiseReview;
};

// GET -- USER
export const getUserById = (id) => {
  const promiseUser = axios
    .get(`http://localhost:8080/`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return new Error(`Failed to get User by ID:${id}`);
    });
  return promiseUser;
};

export const getUserReviewById = (id) => {
  const promiseUserReview = axios
    .get(`http://localhost:8080/user/${id}/userReview`)
    .then((response) => response)
    .catch((error) => console.log(error));

  return promiseUserReview;
};

// POST -- USER SIGN UP

export const signup = (user) => {};
