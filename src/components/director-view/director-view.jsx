import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
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
        <Card className="text-center" style={{ border: '1px solid skyblue' }}>
          <Card.Title style={{ fontSize: '2em' }}>
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
        <h4>{director.Director.Name} movies</h4>
        <div className="d-flex row mt-3 ml-1">
          {movies.map((movie) => {
            if (movie.Director.Name === director.Director.Name) {
              return (
                <div key={movie._id}>
                  <Card
                    className="text-center"
                    style={{ width: '16rem', border: '1px solid skyblue' }}
                  >
                    <Card.Img
                      style={{ height: '370px' }}
                      variant="top"
                      src={movie.ImagePath}
                    />
                    <Card.Body>
                      <Link to={`/movies/${movie._id}`}>
                        <Button variant="primary">Movie Details</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            }
          })}
        </div>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  }),
};
