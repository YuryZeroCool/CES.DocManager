import React from "react";
import ExpiryDriverLicense from "./ExpiryDriverLicense";
import Headers from "./Header";
import Employee from "./Employee";
import DriverLicense from "./DriverLicense";
import DriverMedicalCertificate from "./DriverMedicalCertificate";

export class Home extends React.Component {
  state = {
    isOpen: false,
    drLicenseIsOpen: false,
    medicalCertificate: false,
  };

  handleShow = (value) => {
    this.setState({ isOpen: value });
  };

  handleShowDriverLicense = (value) => {
    this.setState({ drLicenseIsOpen: value });
  };

  handleShowMedicalCertificate = (value) => {
    this.setState({ medicalCertificate: value });
  };

  render() {
    return (
      <>
        <Headers
          show={this.handleShow}
          showFormLicense={this.handleShowDriverLicense}
          showMedicalCertificate ={this.handleShowMedicalCertificate}
        ></Headers>
        <main>
          <div className="wrapper">
            {this.state.isOpen && <Employee show={this.handleShow}></Employee>}
            {this.state.drLicenseIsOpen && (
              <DriverLicense
                showFormLicense={this.handleShowDriverLicense}
              ></DriverLicense>
            )}
            {this.state.medicalCertificate && (
              <DriverMedicalCertificate
              showMedicalCertificate={this.handleShowMedicalCertificate}
              ></DriverMedicalCertificate>
            )}
            {(!this.state.isOpen && !this.state.drLicenseIsOpen && !this.state.medicalCertificate) && <ExpiryDriverLicense></ExpiryDriverLicense>}
          </div>
        </main>
      </>
    );
  }
}
