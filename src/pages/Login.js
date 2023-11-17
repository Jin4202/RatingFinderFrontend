import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/signIn`, credentials)
      .then((response) => {
        console.log(response)
        if(response.data.message.includes("Success sign in")){
          console.log("resopne", response);
          setError(false);
          setUser(response.data);
          navigate("/profile")
        }
        else{
          setError(true);
          console.log(response.data.message)
        }

       
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCredentials((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  console.log(credentials)
  return (
    <div>
      {error && <p>Error in logging in</p>}
      <div className="container">
        <h1>Login</h1>

        <form id="login" onSubmit={(e) => handleOnSubmit(e)}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              required
              id="username"
              name="username"
              placeholder="Input Username"
              className="form-control"
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <div>
            <label htmlFor="password">Pasword:</label>
            <input
              type="password"
              id="password"
              required
              name="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => handleOnChange(e)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
