import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Pagination({
  currentPageNo,
  currentTotalPageSize,
  getNextPrevPage,
}) {
  const generatedPagination = new Array(currentTotalPageSize).fill(true); //used to generate the page buttons

  //Below is the query parameters of the URL link
  const [searchParams] = useSearchParams();
  const pageNumber =
    searchParams.get("pageNumber") == null ? 0 : searchParams.get("pageNumber");

  const brands = searchParams.get("brands");
  const product_type = searchParams.get("product_type");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const navigate = useNavigate();

  /**
   *  Function that handles moving between URL links
   *  Create a URL link with the new page to move to and add to the URL the query parameters if it exist
   *  Finally useNavigate to move to that page
   * @param {number} index - The page index
   */
  const handleNextPrev = (index) => {
    let url = `?pageNumber=${index}`;
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
    navigate(url);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {/**
         * Previous Button
         */}
        <li className={`page-item `}>
          <button
            className={`page-link ${Number(pageNumber) === 1 && "disabled"}`}
            aria-label="Previous"
            onClick={() => {
              // getNextPrevPage(currentPageNo + 1);
              handleNextPrev(Number(pageNumber) - 1);
            }}
          >
            &laquo;
          </button>
          {/* <Link to={`/product?pageNumber=${currentPageNo}`}>
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() => {
                // getNextPrevPage(currentPageNo - 1);
                handleNextPrev(Number(pageNumber) - 1);
              }}
            >
              &laquo;
            </button>
          </Link> */}
        </li>

        {/**
         * The number buttons
         * Will also grey out the number button if we are on the current page
         */}
        <li className="page-item">
          {generatedPagination.map((element, index) => (
            <button
              // className={`page-link ${currentPageNo === index && "active"}`}
              className={`page-link ${
                Number(pageNumber) === index + 1 && "active"
              }`}
              style={{ display: "inline" }}
              onClick={() => {
                // getNextPrevPage(index);
                handleNextPrev(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
        </li>

        {/**
         * Next Button
         */}
        <li
          className={`page-item ${
            currentPageNo + 1 === currentTotalPageSize && "disabled"
          }`}
        >
          <button
            // className="page-link "
            className={`page-link ${
              Number(pageNumber) == currentTotalPageSize && "disabled"
            }`}
            aria-label="Next"
            onClick={() => {
              // getNextPrevPage(currentPageNo + 1);
              handleNextPrev(Number(pageNumber) + 1);
            }}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
