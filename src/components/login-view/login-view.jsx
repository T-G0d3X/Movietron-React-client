import React, { useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login-view.scss';
////////////////////////////////////////////////////////////////////////

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  ////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://movietron-09120.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        alert('no such user');
      });
  };

  /////////////////////////////////////////////////////////////////////////
  return (
    <Container>
      <h1
        style={{
          textAlign: 'center',
          fontFamily: 'cursive',
          fontWeight: 'bold',
          letterSpacing: '20px',
          paddingTop: '50px',
        }}
      >
        MOVIETRON
      </h1>
      <Form
        className="form-login"
        style={{
          marginTop: '60px',
          border: '1px solid white',
          padding: '20px',
          backgroundColor: 'navajowhite',
          paddingTop: '50px',
        }}
        className="logForm"
      >
        <p>Login please</p>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
        </Form.Group>
        <Button onClick={handleSubmit} type="submit">
          Sign in
        </Button>
        <Link to="/register">
          <Button
            className="logBtn"
            type="submit"
            style={{ marginLeft: '10px', backgroundColor: '#333' }}
          >
            Just arrived? Register first!
          </Button>
        </Link>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
  }),
};
