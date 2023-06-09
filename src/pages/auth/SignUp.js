import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function SignUp() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailTaken, setEmailTaken] = useState(false);
  const Navigate = useNavigate();
  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    };
    fetch("/api/signup", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 409) {
          setEmailTaken(true);
          throw new Error("Email already taken");
        } else {
          throw new Error("Internal server error");
        }
      })
      .then((data) => {
        console.log(data);
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setEmailTaken(false);
        Navigate("/login");
        // window.location.replace("/login");
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  }

  return (
    <Wrapper as="section" className="section">
      <Container className="signup-container">
        <Form className="form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          {emailTaken && (
            <Alert variant="danger" className="mt-4 mb-4">
              This email is already taken. Please choose a different one.
            </Alert>
          )}
          <Form.Group className="mb-4" controlId="formFirstName">
            <Form.Label className="form-label">First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formLastName">
            <Form.Label className="form-label">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formEmail">
            <Form.Label className="form-label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-5" controlId="formConfirmPassword">
            <Form.Label className="form-label">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-block">
            Sign Up
          </Button>
        </Form>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  .signup-container {
  }

  .signup-container h1 {
    text-align: center;
  }

  .signup-container .form-group {
    margin-bottom: 20px;
  }

  .signup-container .form-label {
    font-weight: bold;
  }

  .signup-container .submit-btn {
    display: block;
    margin: 0 auto;
    width: 150px;
    font-size: 18px;
  }

  .signup-container .fa {
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    .signup-container {
      width: 100%;
      padding: 20px;
    }
  }
`;

export default SignUp;
