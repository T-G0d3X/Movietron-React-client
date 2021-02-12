import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onBackClick } = this.props;

    if (!movie) return null;

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
              <span className="label text-info">Title: </span>
              {movie.Title}
            </Card.Title>
            <Card.Text>
              <span className="label text-info">Description: </span>
              <span className="value">{movie.Description}</span>
            </Card.Text>
            <Card.Text>
              <span className="label text-info">Genre: </span>
              <span className="value">{movie.Genre.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label text-info">Director: </span>
              <span className="value">{movie.Director.Name}</span>
            </Card.Text>
            <Button onClick={onBackClick} variant="primary">
              Go back to the list
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
