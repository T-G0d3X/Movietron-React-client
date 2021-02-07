// Low level REUSABLE COMPONENT- have a small well defined concern
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card
        style={{
          width: '16rem',
          marginRight: '25px',
          justifyContent: 'center',
          border: 'solid 1px skyblue',
        }}
        className="card-deck "
      >
        <Card.Img
          style={{ height: '380px' }}
          className="card-img-top"
          src={movie.ImagePath}
        />
        <Card.Body style={{ height: '230px' }}>
          <Card.Title className="center">{movie.Title}</Card.Title>
          <Card.Text style={{ height: '130px' }}>{movie.Description}</Card.Text>
        </Card.Body>
        <Button
          style={{ marginBottom: '15px' }}
          onClick={() => onMovieClick(movie)}
          variant="primary btn-sm"
        >
          Open
        </Button>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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
