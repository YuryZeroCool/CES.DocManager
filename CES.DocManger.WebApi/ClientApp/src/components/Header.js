import React from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/header.scss";

class Headers extends React.Component {
  constructor() {
    super();
    this.addEmployee = this.addEmployee.bind(this);
    this.addDriverLicense = this.addDriverLicense.bind(this);
    this.addMedicalCertificate = this.addMedicalCertificate.bind(this);
  }

  addEmployee() {
    this.props.show(true);
    this.props.showFormLicense(false);
    this.props.showMedicalCertificate(false);
  }

  addDriverLicense() {
    this.props.showFormLicense(true);
    this.props.show(false);
    this.props.showMedicalCertificate(false);
  }

  addMedicalCertificate() {
    this.props.showMedicalCertificate(true);
    this.props.showFormLicense(false);
    this.props.show(false);
  }

  render() {
    return (
      <header>
        <div className="wrapper">
          <nav>
            <ul>
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Документы
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Водители права сроки
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Водители медсправки сроки
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Отчеты
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Пробег</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Топливо</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li>
                <Button variant="success" onClick={this.addEmployee}>
                  Добавить водителя
                </Button>
              </li>
              <li>
                <Button variant="success" onClick={this.addDriverLicense}>
                  Добавить права
                </Button>
              </li>
              <li>
                <Button variant="success" onClick={this.addMedicalCertificate}>Добавить медсправку</Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
export default Headers;
