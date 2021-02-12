import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
////////////////////////////////////////////////////////////////////////

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  ////////////////////////////////////////////////////////////////////////

  render() {
    const { movies, genre } = this.props;

    if (!genre) return null;

    //////////////////////////////////////////////////////////////////////////
    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Card className="text-center" style={{ border: '1px solid skyblue' }}>
            <Card.Title>{genre.Genre.Name}</Card.Title>
            <Card.Body>{genre.Genre.Description}</Card.Body>
          </Card>
        </Row>
        <Container>
          <h4 className="mt-4">Some {genre.Genre.Name} movies</h4>
          <div className="d-flex row mt-3 ml-2">
            {movies.map((movie) => {
              if (movie.Genre.Name === genre.Genre.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      className="text-center"
                      style={{ width: '16rem', border: '1px solid skyblue' }}
                    >
                      <Card.Img
                        variant="top"
                        style={{ height: '370px' }}
                        src={movie.ImagePath}
                      />
                      <Card.Body>
                        <Link to={`/movies/${movie._id}`}>
                          <Button variant="primary">More Info</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Container>
      </Container>
    );
  }
}

GenreView.propTypes = {
  Movie: PropTypes.shape({
    Genre: {
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      // ImagePath: PropTypes.string.isRequired,
    },
  }),
};
