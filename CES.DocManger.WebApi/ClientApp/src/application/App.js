import React from 'react';
import { Route } from 'react-router';
import { Home } from '../components/Home';

import './App.scss';

export default class App extends React.Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
      </>
    );
  }
}
