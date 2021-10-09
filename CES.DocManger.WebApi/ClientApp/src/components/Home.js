import React from 'react';
import ExpiryDriverLicense from './ExpiryDriverLicense';
import Headers from './Header';
import Employee from './Employee';
import DriverLicense from './DriverLicense';

export class Home extends React.Component {
  state = {
    isOpen: false,
    drLicenseIsOpen: false,
  };

  handleShow = (value) => {
    this.setState({ isOpen: value });
  };

  handleShowDriverLicense = (value) => {
    this.setState({ drLicenseIsOpen: value });
  };

  render() {
    return (
      <>
        <Headers
          show={this.handleShow}
          showFormLicense={this.handleShowDriverLicense}
        ></Headers>
        <main>
          {this.state.isOpen && <Employee show={this.handleShow}></Employee>}
          {this.state.drLicenseIsOpen && (
            <DriverLicense
              showFormLicense={this.handleShowDriverLicense}
            ></DriverLicense>
          )}
          <ExpiryDriverLicense></ExpiryDriverLicense>
        </main>
      </>
    );
  }
}
