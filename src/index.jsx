import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import { Container } from 'react-bootstrap';

import './index.scss';

import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore } from 'redux';
// Provider connect entire global state(STORE) to our app
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid>
        <Provider store={store}>
          <MainView />
        </Provider>
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
