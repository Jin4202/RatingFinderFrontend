import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

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
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <input
        type="text"
        placeholder="Find Prouduct"
        onChange={(e) => handleOnChange(e)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
