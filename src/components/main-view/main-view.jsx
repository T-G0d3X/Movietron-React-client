// HIGH-LEVEL component - SUPERVISE OTHER components
import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Navbar, Form, Nav } from 'react-bootstrap';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../update-view/update-view';
import { Link } from 'react-router-dom';

import './main-view.scss';

import MoviesList from '../movies-list/movies-list';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

//////////////////////////////////////////////////////////////////////

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }
  //////////////////////////////////////////////////////////////////////
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get('https://movietron-09120.herokuapp.com/movies', {
        //  passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSignOut() {
    localStorage.clear();
    this.setState({
      user: null,
    });
  }

  render() {
    let { movies, visibilityFilter, movie } = this.props;
    let { user } = this.state;

    //////////////////////////////////////////////////////////////////////////
    return (
      <Router>
        {user && (
          <Navbar
            style={{ backgroundColor: 'white' }}
            variant="dark"
            expand="md"
          >
            <Navbar.Toggle
              style={{ backgroundColor: 'burlywood', alignItems: 'center' }}
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                {user && (
                  <Nav.Item>
                    <Nav.Link
                      className="navLinkHome"
                      as={Link}
                      to={`/`}
                      target="_self"
                      style={{
                        color: 'burlywood',
                        fontWeight: 'bold',
                        letterSpacing: '10px',
                        margin: 'auto',
                      }}
                    >
                      MOVIETRON
                    </Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
              {user && (
                <Nav.Item>
                  <Nav.Link
                    className="navLink"
                    as={Link}
                    to={`/users/${user}`}
                    target="_self"
                    style={{
                      color: 'burlywood',
                    }}
                  >
                    Profile
                  </Nav.Link>
                </Nav.Item>
              )}
              {user && (
                <Nav.Item>
                  <Nav.Link
                    className="navLink"
                    as={Link}
                    to={`/`}
                    target="_self"
                    onClick={(user) => this.onSignOut(user)}
                    style={{
                      color: 'burlywood',
                    }}
                  >
                    Log Out
                  </Nav.Link>
                </Nav.Item>
              )}

              {user && (
                <Form inline>
                  <VisibilityFilterInput
                    variant="outline-light"
                    visibilityFilter={visibilityFilter}
                    className="filter"
                  />
                </Form>
              )}
            </Navbar.Collapse>
          </Navbar>
        )}

        {/* //////////////////////////////////////////////////////////////// */}
        <div className="main-view" style={{ backgroundColor: 'burlywood' }}>
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );

              return <MoviesList movies={movies} />;
            }}
          />
          {/* ////////////////////////////////////////////////////////////// */}

          <Route path="/register" render={() => <RegisterView />} />

          {/* ///////////////////////////////////////////////////////////// */}

          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find(
                  (movie) => movie._id === match.params.movieId
                )}
              />
            )}
          />

          {/* ////////////////////////////////////////////////////////////// */}

          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={movies.find(
                    (movie) => movie.Director.Name === match.params.name
                  )}
                  movies={movies}
                />
              );
            }}
          />

          {/* //////////////////////////////////////////////////////////// */}

          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={movies.find(
                    (movie) => movie.Genre.Name === match.params.name
                  )}
                  movies={movies}
                />
              );
            }}
          />

          {/* ////////////////////////////////////////////////////////////// */}

          <Route
            path="/users/:userId"
            render={() => {
              return <ProfileView movies={movies} movie={movie} />;
            }}
          />

          {/* ////////////////////////////////////////////////////////////// */}

          <Route
            path="/update/:userId"
            render={() => {
              return <ProfileUpdate />;
            }}
          />

          {/* ////////////////////////////////////////////////////////////// */}
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
