import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import '../registration-view/registration-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(username);
  };

  return (
    <Form>
      <h1 className="alert-primary shadow text-uppercase align-middle">
        Welcome to Movietron, best movie app!
      </h1>
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
          placeholder="Enter Birthzddaay"
        ></Form.Control>
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func.isRequired,
};
