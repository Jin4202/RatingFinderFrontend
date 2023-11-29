import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import SearchResults from "../pages/SearchResults";
import Searchbar from "./Searchbar";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    alert("Sucessfully Logged Out");
    navigate("/");
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">
          Rating Finder
        </Link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link className="nav-link active" to="/product?pageNumber=1">
                Products
              </Link>
            </li>

            <li class="nav-item">
              <Link className="nav-link active" to="/product?pageNumber=1">
                About
              </Link>
            </li>
          </ul>
          <span className="d-flex">
            <Searchbar/>
            {user ? (
              <>
                <Link to="/profile">
                  <button className="btn btn-primary">Profile</button>
                </Link>
                <button onClick={logout} className="btn btn-primary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>

                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
}
