import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Email is taken, user already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    // By default form takes full 12 column width. We want form to take 6 cloumn space in large screen,  8 column space in midium screen and display in middle(for this we use mx-auto) and by default take 12 column space in small screen.
    // you could also have used this format to achieve this layout:-
    // <div class="container">
    // 	<div class="row">
    // 		<div class="col bg-primary col-lg-6 m-auto">Form goes here</div>
    // 	</div>
    // </div>
    // mx-auto means margin: 0 auto; ie margin left and right are set to auto
    <Form onSubmit={onSubmit} className="col-lg-6 col-md-8 mx-auto">
      <h1 className="text-center mt-3 mb-3">
        Account <span className="text-primary">Register</span>
      </h1>

      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          // required
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          minLength={6}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
          minLength={6}
        />
      </Form.Group>

      <Button block variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default Register;
