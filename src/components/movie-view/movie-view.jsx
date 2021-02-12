import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
//////////////////////////////////////////////////////////////////////

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  //////////////////////////////////////////////////////////////////////
  addtoFavorites(movie) {
    let token = localStorage.getItem('token');
    let url =
      'https://movietron-09120.herokuapp.com/users/' +
      localStorage.getItem('user') +
      '/Movies/' +
      movie._id;
    axios
      .post(url, '', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open('/users/' + localStorage.getItem('user'), '_self');
      })
      .catch((error) => {
        console.log('Error Adding movie to favorites.');
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    ///////////////////////////////////////////////////////////////////////////
    return (
      <div className="movie-view">
        <Card style={{ width: '18rem', border: 'solid 1px skyblue' }}>
          <Card.Img
            className="movie-poster"
            variant="top"
            src={movie.ImagePath}
          />
          <Card.Body>
            <Card.Title>
              <h1 className="label">{movie.Title} </h1>
            </Card.Title>
            <Card.Text>
              <span className="label">{movie.Description}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Genre: </span>

              <Link to={`/genres/${movie.Genre.Name}`}>
                <span className="value">{movie.Genre.Name}</span>
              </Link>
            </Card.Text>
            <Card.Text>
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <span className="value">{movie.Director.Name}</span>
              </Link>
            </Card.Text>
            <Button
              style={{ marginBottom: '8px' }}
              onClick={() => this.addtoFavorites(movie)}
              block
            >
              Add to Favorites
            </Button>
            <Link to={`/`}>
              <Button
                style={{ backgroundColor: 'grey', border: 'none' }}
                block
                variant="primary"
              >
                Back to the list
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
