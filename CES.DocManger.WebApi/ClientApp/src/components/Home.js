import React from 'react';
import ExpiryDriverLicense from './ExpiryDriverLicense';
import Headers from './Header';
import Employee from './Employee';

export class Home extends React.Component {
  state = {
    isOpen: false,
  };

  handleShow = (value) => {
    this.setState({ isOpen: value });
  };

  render() {
    return (
      <>
        <Headers show={this.handleShow}></Headers>
        <main>
          {this.state.isOpen && <Employee show={this.handleShow}></Employee>}
          <ExpiryDriverLicense></ExpiryDriverLicense>
        </main>
      </>
    );
  }
}
