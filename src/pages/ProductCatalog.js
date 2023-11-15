import React, { useEffect, useState } from "react";
import Product from "../components/Product/Product";
import "./productcatalog.css";
import FilterForm from "../components/FilterForm";

import useAPIService from "../service/useAPIService";
import {
  getAllBrands,
  getFilterProducts,
  getProductByPage,
} from "../service/APIService";
import axios from "axios";
import Pagination from "../components/Pagination";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Searchbar from "../components/Searchbar";

export default function ProductCatalog() {
  //Below is the query parameters of the URL link
  const [searchParams] = useSearchParams();
  const pageNumber =
    searchParams.get("pageNumber") == null ? 0 : searchParams.get("pageNumber");

  const brands = searchParams.get("brands");
  const product_type = searchParams.get("product_type");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // console.log("search params", searchParams.get("pageNumber"));
  const [data, setData] = useState({
    loading: false,
    apiData: [],
    error: false,
  });

  const [page, setPage] = useState({
    currentPageNo: 1,
    currentPageSize: 10,
    currentTotalPageSize: 1,
  });

  //Below is a function that is used to make API calls
  const [loading, response, error] = useAPIService(
    () =>
      getFilterProducts(pageNumber, brands, product_type, minPrice, maxPrice),
    [pageNumber, brands, product_type, minPrice, maxPrice]
  );

  // console.log("test data", response);

  //maybe pass the min,max, brand, productType to the pagination ?
  const getNextPrevPage = (pageNo) => {
    axios
      .get(`http://localhost:8080/product?pageNumber=${pageNo}`)
      .then((response) => {
        setData({
          loading: false,
          apiData: response.data.content,
          error: false,
        });
        setPage({
          currentPageNo: response.data.number,
          currentPageSize: 10,
          currentTotalPageSize: response.data.totalPages,
        });
      })
      .catch((error) => {
        console.log(error);
        throw new Error(`FAILED TO FETCH PRODUCTS WITH PAGE NOB ${pageNo}`);
      });
  };

  // useEffect(() => {
  //   let url = `http://localhost:8080/product?pageNumber=${pageNumber}`;
  //   if (brands) {
  //     url += `&brands=${brands}`;
  //   }
  //   if (product_type) {
  //     url += `&product_type=${product_type}`;
  //   }
  //   if (minPrice) {
  //     url += `&minPrice=${minPrice}`;
  //   }
  //   if (maxPrice) {
  //     url += `&maxPrice=${maxPrice}`;
  //   }
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       console.log(response);
  //       setData({
  //         loading: false,
  //         apiData: response.data.content,
  //         error: false,
  //       });
  //       setPage({
  //         currentPageNo: response.data.number,
  //         currentPageSize: 10,
  //         currentTotalPageSize: response.data.totalPages,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setData({
  //         loading: false,
  //         apiData: [],
  //         error: true,
  //       });
  //       return new Error("FAIELD TO FETCH PRODUCTS");
  //     });
  // }, [pageNumber]);

  //This for the FIlterForm that does the calling
  const sendApiResponse = (response) => {
    // setData(response);
  };

  return (
    <div className="">
      <div className="container search-container">
        <Searchbar />
      </div>


      {error ? (
        <p>ERROR IN RESPONSE</p>
      ) : loading ? (
        <p>LOADING...</p>
      ) : (
        <div className="product-catalog container d-flex flex-wrap">
          {response.content.length > 0 ? (
            response.content.map((element) => {
              return (
                <Link
                  to={`/product/${element.prod_id}`}
                  key={element.prod_id}
                  // state={element}
                >
                  <Product product={element} />
                </Link>
              );
            })
          ) : (
            <p>No products with such fitlers</p>
          )}
        </div>
      )}

      {/* {data.error ? (
        <p>Error in fetching products from DB.</p>
      ) : data.loading ? (
        <p>Loading</p>
      ) : (
        <div className="product-catalog container d-flex flex-wrap">
          {data.apiData.map((element, index) => {
            return (
              <Link
                to={`/product/${element.prod_id}`}
                key={element.prod_id}
                state={element}
              >
                <Product product={element} />
              </Link>
            );
          })}
        </div>
      )} */}

      {/* <Pagination
        currentPageNo={page.currentPageNo}
        currentTotalPageSize={page.currentTotalPageSize}
        getNextPrevPage={getNextPrevPage}
      /> */}

      {/* {data.error ? (
        <p>ERROR IN RESPONSE</p>
      ) : data.loading ? (
        <p>loading</p>
      ) : (
        <Pagination currentTotalPageSize={data.apiData.totalPages} />
      )} */}

      {error ? (
        <p>ERROR IN RESPOSNE</p>
      ) : loading ? (
        <p>Loading</p>
      ) : (
        <Pagination currentTotalPageSize={response.totalPages} />
      )}
    </div>
  );
}
