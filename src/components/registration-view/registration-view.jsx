import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import '../registration-view/registration-view.scss';
import axios from 'axios';

import { Link } from 'react-router-dom';
//////////////////////////////////////////////////////////////////////

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  //////////////////////////////////////////////////////////////////////

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios
      .post('https://movietron-09120.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // _self so the page opens in current tab
      })
      .catch((e) => {
        console.log('error registering the user');
      });
  };

  ////////////////////////////////////////////////////////////////
  return (
    <Form style={{ marginTop: '50px' }}>
      <p>Register for nice list of movies</p>

      <Form.Group controlId="formBasicText">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </Form.Group>

      <Form.Group controlId="fromBasicBirthday">
        <Form.Label>Enter your birthday</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Enter Birthday"
        ></Form.Control>
      </Form.Group>

      <Button onClick={handleRegister} variant="primary" type="submit">
        Submit
      </Button>
      <Link to="/">
        <Button type="submit" variant="primary" style={{ marginLeft: '10px' }}>
          Already have an account?
        </Button>
      </Link>
    </Form>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};