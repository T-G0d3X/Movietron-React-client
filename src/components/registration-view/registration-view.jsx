import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Form, Button, Container } from 'react-bootstrap';
import '../registration-view/registration-view.scss';
import axios from 'axios';

import './registration-view.scss';
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
        if (username === '' || username === null) {
          alert('Username is required');
        } else if (username.length < 5) {
          alert('Username needs to be longer then 5 letters');
        } else if (password === '' || password === null) {
          alert('Password is required');
        } else if (email.indexOf('@') === -1) {
          alert('You need a valid email adress');
        } else if (birthday === '') {
          alert('enter your birthday');
        }
      });
  };

  ////////////////////////////////////////////////////////////////
  return (
    <Container>
      <h1
        style={{
          textAlign: 'center',
          fontFamily: 'cursive',
          fontWeight: 'bold',
          letterSpacing: '1em',
          paddingTop: '50px',
        }}
      >
        MOVIETRON
      </h1>
      <Form
        style={{
          marginTop: '60px',
          border: '1px solid white',
          padding: '20px',
          backgroundColor: 'navajowhite',
          paddingTop: '50px',
        }}
        className="regForm"
      >
        <p>Register for nice list of movies</p>

        <Form.Group controlId="formBasicText">
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </Form.Group>

        <Form.Group controlId="fromBasicBirthday">
          <Form.Label>Enter your birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="Enter Birthday"
            required
          ></Form.Control>
        </Form.Group>

        <Button onClick={handleRegister} variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/">
          <Button
            className="regBtn"
            type="submit"
            variant="primary"
            style={{
              marginLeft: '10px',
              backgroundColor: '#333',
              border: 'none',
            }}
          >
            Already have an account?
          </Button>
        </Link>
      </Form>
    </Container>
  );
}

RegisterView.propTypes = {
  register: propTypes.shape({
    Username: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Birthday: propTypes.string.isRequired,
  }),
  onRegister: propTypes.func,
};
