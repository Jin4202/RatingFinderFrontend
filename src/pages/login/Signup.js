import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DB_URL } from "../../utils/URLs";
import { Button, Form } from "react-bootstrap";
import useApiService from "../../service/useAPIService";
import { signup } from "../../service/APIService";
import { useNavigate } from "react-router-dom";

const titleFont = {
  fontWeight: "bold",
  fontSize: "48px",
  marginTop: "20px",
  marginBottom: "20px",
};

export default function Signup(props) {
  const navigate = useNavigate();

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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setResponse((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .post(`http://localhost:8080/api/signUp`, form)
      .then((response) => {
        if (response.data.includes("New user has been signed Up")) {
          setResponse(() => ({
            loading: false,
            data: response,
            error: false,
          }));
          navigate('/confirmation', {state: {username:form.username}})
        } else {
          setResponse(() => ({
            data: response,
            loading: false,
            error: true,
          }));
        }
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

  return (
    <>
      <div
        style={{
          marginBottom: "80px",
        }}
      >
        <div
          style={{
            margin: "40px",
          }}
        >
          <div style={titleFont}>Find Your Ratings</div>
          <div>
            Sign up now to get personalized recommendations and share your
            reviews with others.
          </div>
        </div>
      </div>
      {response.loading && <p>Loading..</p>}
      {response.error && <p>{`Error in siging up : ${response.data.data}`}</p>}
      <Container>
        <Form onSubmit={(e) => handleOnSubmit(e)}>
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
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
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
        <Row>
          <Col>
            <div style={titleFont}>Get in Touch</div>
          </Col>
          <Col>
            <div>First Name</div>
            <div>Last Name</div>
            <div>Username</div>
            <div>Email</div>
            <div>Password</div>
            <div>Re-type Password</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
