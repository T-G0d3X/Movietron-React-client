// Low level REUSABLE COMPONENT- have a small well defined concern
import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
//////////////////////////////////////////////////////////////////////

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    ////////////////////////////////////////////////////////////////////////////
    return (
      <Card
        style={{
          width: '16rem',
          justifyContent: 'center',
          border: 'solid 1px skyblue',
          marginTop: '20px',
          marginLeft: '10px',
        }}
        className="card-deck"
      >
        <Card.Img
          style={{ height: '380px' }}
          className="card-img-top"
          src={movie.ImagePath}
        />
        <Card.Body style={{ height: '280px' }}>
          <Card.Title>
            <h3 className="label">{movie.Title} </h3>
          </Card.Title>
          <Card.Text>
            <span className="label">{movie.Description}</span>
          </Card.Text>
        </Card.Body>
        <Link style={{ textAlign: 'center' }} to={`/movies/${movie._id}`}>
          <Button
            style={{ marginBottom: '10px', width: '230px' }}
            variant="primary"
          >
            Open
          </Button>
        </Link>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string,
    ImagePath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string,
      Biography: propTypes.string,
    }),
    Director: propTypes.shape({
      Name: propTypes.string,
      Bio: propTypes.string,
      Birth: propTypes.string,
    }),
    Featured: propTypes.bool,
  }).isRequired,
};
