import React from 'react';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import { Row, Col } from 'react-bootstrap';
import './movies-list.scss';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Row className="movies-list">
      {filteredMovies.map((m) => (
        <MovieCard key={m._id} movie={m} />
      ))}
    </Row>
  );
}

export default connect(mapStateToProps)(MoviesList);
