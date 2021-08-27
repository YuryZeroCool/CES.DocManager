import React from 'react';
import ExpiryDriverLicense from './ExpiryDriverLicense';
import Headers from './Header';

export class Home extends React.Component {
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
