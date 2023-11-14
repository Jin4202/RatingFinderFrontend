import React, { useState } from "react";
import useAPIService from "../service/useAPIService";
import { signup } from "../service/APIService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    credit_level: 1,
  });

  const [response, setResponse] = useState({
    loading: false,
    data: "",
    error: false,
  });

  
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };

  console.log(response);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setResponse((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .post(
        `http://localhost:8080/api/createUser?username=${form.username}&email=${form.email}&password=${form.password}&credit_level=${form.credit_level}`
      )
      .then((response) => {
        setResponse(() => ({
          loading: false,
          data: response,
          error: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: true,
        }));
      });
  };

  return (
    <div className="container">
      <h1>Create a new account</h1>
      {response.error && <h1>ERROR In SIGNING UP</h1>}
      <form id="signup" onSubmit={(e) => handleOnSubmit(e)}>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            name="email"
            placeholder="Enter Email"
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
  );
}
