import React, { useEffect, useState } from "react";
import useAPIService from "../service/useAPIService";
import { getAllBrands, getAllProductTypes } from "../service/APIService";
import { useNavigate } from "react-router-dom";

export default function FilterForm() {
  const navigate = useNavigate();

  const [filter, setFilters] = useState({
    brands: [],
    productTypes: [],
    min: 0,
    max: 500,
  });

  const [formError, setFormError] = useState(false);

  const [brandLoading, brandData, brandError] = useAPIService(getAllBrands, []);
  const [typeLoading, productTypeData, typeError] = useAPIService(
    getAllProductTypes,
    []
  );

  //Handle form submission. Builds the URL needed to navigate to. Also adds the filters if they exist into the url
  const handleSubmit = (e) => {
    e.preventDefault();
    if (filter.min > filter.max) {
      setFormError(true);
    } else {
      setFormError(false);
      let url = `/product?pageNumber=1`;
      //adding brands to the url link if available
      if (filter.brands.length > 0) {
        url += `&brands=`;
        for (let i = 0; i < filter.brands.length; i++) {
          const brand = filter.brands[i];
          if (i == filter.brands.length - 1) {
            url += `${brand}`;
          } else {
            url += `${brand},`;
          }
        }
      }
      //adding product_type to the url link if available
      if (filter.productTypes.length > 0) {
        url += `&product_type=`;
        for (let i = 0; i < filter.productTypes.length; i++) {
          const product_type = filter.productTypes[i];
          if (i == filter.productTypes.length - 1) {
            url += `${product_type}`;
          } else {
            url += `${product_type},`;
          }
        }
      }

      url += `&minPrice=${filter.min}&maxPrice=${filter.max}`;
      console.log("url:", url);
      navigate(url);
    }
    console.log("SUBMMITED WITH FILTERS: ", filter);
  };

  //edit for checkboxes
  const handleFilterUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]:
        [name] == "brands" || [name] == "productTypes"
          ? prevFilters[name].includes(value)
            ? prevFilters[name].filter((item) => item != value)
            : [...prevFilters[name], value]
          : value,
    }));
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const style = {
    height: "500px",
    overflowY: "scroll",
  };
  return (
    <div className="filter-search-container container w-50 bg-light rounded p-3">
      {formError && (
        <div className="alert alert-danger">
          FAILED TO SUBMIT FILTER FORM. CHECK THE FILTER VALUES AGAIN
        </div>
      )}
      <h3 className="text-start">Filter Options</h3>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="option-section">
          <h5>Brands</h5>

          {brandError ? (
            <p>ERROR IN LOADING</p>
          ) : brandLoading ? (
            <p>Loading</p>
          ) : (
            <ul className="list-group " data-bs-spy="scroll" style={style}>
              {brandData.map((element) => (
                <li key={element} className="list-group-item">
                  <input
                    type="checkbox"
                    name="brands"
                    id={element}
                    value={element}
                    checked={filter.brands.includes(element)}
                    onChange={(e) => handleFilterUpdate(e)}
                  />
                  <label htmlFor={element}>{element}</label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="option-section">
          <h5 className="text-start">Product Type</h5>
          {typeError ? (
            <p>ERROR IN FETCHING PRODUCT TYPES</p>
          ) : typeLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="list-group">
              {productTypeData.map((element) => (
                <li key={element} className="list-group-item">
                  <input
                    type="checkbox"
                    name="productTypes"
                    className="form-check-input"
                    value={element}
                    checked={filter.productTypes.includes(element)}
                    onChange={(e) => handleFilterUpdate(e)}
                    id={element}
                  />
                  <label htmlFor={element}>{element}</label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="option-section">
          <h5>Price Range</h5>
          <input
            type="number"
            name="min"
            placeholder="Min"
            min="0"
            value={filter.min}
            onKeyDown={(e) => {
              preventMinus(e);
            }}
            onChange={(e) => handleFilterUpdate(e)}
          />
          <input
            type="number"
            name="max"
            placeholder="Max"
            min="0"
            value={filter.max}
            onKeyDown={(e) => {
              preventMinus(e);
            }}
            onChange={(e) => handleFilterUpdate(e)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
