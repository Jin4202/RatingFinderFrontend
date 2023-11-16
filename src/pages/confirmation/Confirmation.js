import React from "react";
import { Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

//Page designed to redirect user after signign up

export default function Confirmation() {
  const { state } = useLocation();
  console.log(state);
  return (
    <Container>
      <h3>Successfuly signed up for user: {state.username}</h3>

      <Link to="/login">Click here to login</Link>
    </Container>
  );
}
