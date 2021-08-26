import React, { Component } from 'react';
import ExpiryDriverLicense from './ExpiryDriverLicense';
import Headers from './Header';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <>
        <Headers></Headers>
        <main>
          <ExpiryDriverLicense></ExpiryDriverLicense>
        </main>
      </>
    );
  }
}
