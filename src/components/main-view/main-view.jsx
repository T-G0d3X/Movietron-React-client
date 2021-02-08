// HIGH-LEVEL component - SUPERVISE OTHER components
import React from 'react';
import axios from 'axios';

import {
  Navbar,
  Nav,
  Row,
  Col,
  Form,
  FormControl,
  Container,
} from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    // initial state is set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    axios
      .get('https://movietron-09120.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // When a movie is clicked, function is invoked and updates the state of the 'selectedMovie'
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register)
      return (
        <RegisterView onRegister={(register) => this.onRegister(register)} />
      );

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies loaded
    if (!movies) return <div className="main-view" />;

    return (
      <React.Fragment>
        <Nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Movietron
            </a>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    List of movies
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Directors
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Actors
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Genres
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Nav>
        <div style={{ justifyContent: 'center' }} className="main-view row">
          {selectedMovie ? (
            <MovieView
              movie={selectedMovie}
              onBackClick={() => this.onBackClick()}
            />
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(movie) => this.onMovieClick(movie)}
              />
            ))
          )}
        </div>
      </React.Fragment>
    );
  }
}
