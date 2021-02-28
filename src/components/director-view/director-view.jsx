import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { MovieCard } from '../movie-card/movie-card';
import './director-view.scss';
////////////////////////////////////////////////////////////////////////

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  ////////////////////////////////////////////////////////////////////////

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    //////////////////////////////////////////////////////////////////////
    return (
      <Container>
        <Card
          className="text-center"
          style={{ border: '1px solid skyblue', marginTop: '30px' }}
        >
          <Card.Title style={{ fontSize: '2em', marginTop: '10px' }}>
            {director.Director.Name}
          </Card.Title>
          <Card.Body>
            <Card.Text>{director.Director.Bio}</Card.Text>
            <Card.Text>
              <strong>Birth:</strong>
              {director.Director.Birth}
            </Card.Text>
            <Card.Text>
              <strong>Died:</strong>
              {director.Director.Death}
            </Card.Text>
          </Card.Body>
        </Card>
        <h4 style={{ marginTop: '20px' }}>{director.Director.Name} movies</h4>
        {movies.map((movie) => {
          if (movie.Director.Name === director.Director.Name) {
            return <MovieCard key={movie._id} movie={movie} />;
          }
        })}
      </Container>
    );
  }
}

DirectorView.propTypes = {
  movie: propTypes.shape({
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
      Birthday: propTypes.instanceOf(Date),
    }),
  }),
};
