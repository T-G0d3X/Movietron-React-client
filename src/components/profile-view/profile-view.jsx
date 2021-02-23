import React, { useState } from 'react';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

import axios from 'axios';
import './profile-view.scss';
//////////////////////////////////////////////////////////////////////

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      birthday: '',
      favoriteMovies: [],
      movies: '',
    };
  }
  //////////////////////////////////////////////////////////////////////

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    let url =
      'https://movietron-09120.herokuapp.com/users/' +
      localStorage.getItem('user');
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem('token');
    let url =
      'https://movietron-09120.herokuapp.com/users/' +
      localStorage.getItem('user') +
      '/Movies/' +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('Movie is removed');
        this.componentDidMount();
      });
  }

  handleDelete() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios
      .delete(`https://movietron-09120.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(user + ' has been deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.pathname = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    // this.getUser(localStorage.getItem("token"));
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    if (!movies) alert('Please sign in');

    ////////////////////////////////////////////////////////////////////
    return (
      <div>
        <Container>
          <Row>
            <Form>
              <Card
                style={{
                  border: '1px solid skyblue',
                  flexDirection: 'row',
                  marginTop: '50px',
                }}
              >
                <Card.Body>
                  <Form.Group controlId="formBasicUsername">
                    <h4>Username: </h4>
                    <Form.Label>{this.state.username}</Form.Label>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <h4>Email:</h4>
                    <Form.Label>{this.state.email}</Form.Label>
                  </Form.Group>
                  <Form.Group controlId="formBasicDate">
                    <h4>Birthday:</h4>
                    <Form.Label>{this.state.birthday}</Form.Label>
                  </Form.Group>
                  <Link to={`/update/${this.state.username}`}>
                    <Button variant="primary" type="link" size="sm" block>
                      Edit Profile
                    </Button>
                  </Link>
                  <Button
                    style={{
                      backgroundColor: 'lightgray',
                      border: 'none',
                      marginTop: '8px',
                    }}
                    block
                    size="sm"
                    onClick={() => this.handleDelete()}
                  >
                    Delete Account
                  </Button>
                </Card.Body>
                <Card.Body className="profileCardBody">
                  <span style={{ textAlign: 'center' }}>
                    My Favorite Movies:
                  </span>
                  {favoriteMovieList.map((movie) => {
                    return (
                      <div className="profileImg" key={movie._id}>
                        <Card.Img
                          style={{ width: '40%', height: '40%' }}
                          variant="top"
                          src={movie.ImagePath}
                        />
                        <Button
                          className="profileBtn"
                          style={{
                            backgroundColor: 'gray',
                            border: 'none',
                            marginLeft: '16px',
                          }}
                          size="sm"
                          onClick={() => this.removeFavorite(movie)}
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                </Card.Body>
              </Card>
            </Form>
          </Row>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: propTypes.shape({
    FavoriteMovies: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired,
        Title: propTypes.string.isRequired,
      })
    ),
    Username: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.instanceOf(Date),
  }),
};

