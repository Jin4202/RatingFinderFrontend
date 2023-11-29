import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchInput != "") {
      navigate(`/search/keyword?keyword=${searchInput}`);
      window.location.reload();
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  return (
    <form onSubmit={(e) => handleOnSubmit(e)} className="mr-3">
      <input
        type="text"
        placeholder={
          searchParams.get("keyword")
            ? searchParams.get("keyword")
            : "Search Product"
        }
        onChange={(e) => handleOnChange(e)}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}
