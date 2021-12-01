import React from 'react';
import { Route } from 'react-router';
import { Home } from '../components/Home';
import { Login } from '../components/Login';

import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
      </>
    );
  }
}
