import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        console.log('no such user');
      });
  };

  /////////////////////////////////////////////////////////////////////////
  return (
    <Form
      className="form-login"
      style={{
        marginTop: '60px',
        border: '1px solid skyblue',
        padding: '20px',
      }}
    >
      <p>Login please</p>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </Form.Group>
      <Button onClick={handleSubmit} variant="primary" type="submit">
        Sign in
      </Button>
      <Link to="/register">
        <Button type="submit" style={{ marginLeft: '10px' }}>
          Just arrived? Register first!
        </Button>
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};
