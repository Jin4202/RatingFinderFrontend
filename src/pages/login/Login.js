import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const { user, setUser } = useContext(AuthContext);

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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/signIn`, credentials)
      .then((response) => {
        console.log("resopne", response);
        setError(false)
        setUser(response.data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  return (
    <Container>
      {error && <p>Error in Logging in</p>}
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <h4>Login</h4>
        <Form.Group className="mb-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={(e) => handleOnChange(e)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Pasword"
            name="password"
            onChange={(e) => handleOnChange(e)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
