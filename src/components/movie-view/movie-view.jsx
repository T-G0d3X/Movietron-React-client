import React from 'react';
import propTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './movie-view.scss';
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
        alert('Error Adding movie to favorites.');
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    ///////////////////////////////////////////////////////////////////////////
    return (
      <div className="movie-view">
        <Card
          style={{
            width: '18rem',
            border: 'solid 1px skyblue',
            marginTop: '30px',
          }}
        >
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

MovieView.propTypes = {
  // shape({...}) means it expects an object
  movie: propTypes.shape({
    // movie prop may contain Title, and IF it does, it must be a string
    Title: propTypes.string.isRequired,
    Description: propTypes.string,
    ImagePath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string,
    }),
    Director: propTypes.shape({
      Name: propTypes.string,
      Bio: propTypes.string,
      Birth: propTypes.string,
    }),
    Featured: propTypes.bool,
  }),
  user: propTypes.shape({
    Username: propTypes.string,
  }),
};
