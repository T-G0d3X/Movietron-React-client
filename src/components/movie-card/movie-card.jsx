// Low level REUSABLE COMPONENT- have a small well defined concern
import React from 'react';
import PropTypes from 'prop-types';
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
          marginRight: '25px',
          justifyContent: 'center',
          border: 'solid 1px skyblue',
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
        <Link to={`/movies/${movie._id}`}>
          <Button style={{ marginBottom: '10px' }} variant="primary">
            Open
          </Button>
        </Link>
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
};
