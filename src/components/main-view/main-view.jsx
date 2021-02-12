// HIGH-LEVEL component - SUPERVISE OTHER components
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../update-view/update-view';

//////////////////////////////////////////////////////////////////////

export class MainView extends React.Component {
  constructor() {
    super();
    // initial state is set to null
    this.state = {
      movies: [],
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
    console.log(authData);
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
        this.setState({
          movies: response.data,
        });
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
    const { movies, user } = this.state;
    const { movie } = this.props;

    // Before the movies loaded
    if (!movies) return <div className="main-view" />;

    //////////////////////////////////////////////////////////////////////////
    return (
      <Router>
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link
              href="/"
              style={{
                fontSize: '2em',
                color: 'darkblue',
                fontWeight: 'bold',
                fontFamily: 'Franklin Gothic Medium',
                letterSpacing: '13px',
              }}
            >
              MOVIETRON
            </Nav.Link>
            <Nav.Link
              style={{ display: 'inline' }}
              href="/users/userId"
              eventKey="link-1"
            >
              <h5 style={{ display: 'inline' }}>My Profile</h5>
            </Nav.Link>
            <Nav.Link style={{ display: 'inline' }}>
              <h5
                onClick={(user) => this.onSignOut(user)}
                style={{ display: 'inline', marginLeft: '80px' }}
              >
                Log out
              </h5>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div style={{ justifyContent: 'center' }} className="main-view row">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );

              return movies.map((m) => <MovieCard key={m._id} movie={m} />);
            }}
          />
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
          <Route path="/register" render={() => <RegisterView />} />
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
          <Route
            path="/users/:userId"
            render={() => {
              return <ProfileView movies={movies} movie={movie} />;
            }}
          />
          <Route
            path="/update/:userId"
            render={() => {
              return <ProfileUpdate />;
            }}
          />
        </div>
      </Router>
    );
  }
}
