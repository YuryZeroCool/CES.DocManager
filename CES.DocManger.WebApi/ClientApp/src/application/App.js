import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from '../components/Home';
import DriverLicense from '../components/ExpiryDriverLicense';

import './App.scss';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <>
        <Route exact path="/" component={Home} />
        <DriverLicense></DriverLicense>
      </>
    );
  }
}
