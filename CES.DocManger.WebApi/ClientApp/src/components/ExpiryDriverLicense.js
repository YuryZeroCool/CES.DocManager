import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import "../styles/expiryDriverLicense.scss";

class ExpiryDriverLicense extends React.Component {
  state = {
    employees: [
      {
        birthDate: '',
        divisionNumber: 0,
        expiryDate: '',
        firstName: '',
        lastName: '',
      },
    ],
    counter: 0,
  };

  async componentDidMount() {
    let res = await axios.get(
      process.env.REACT_APP_EXPIRING_DRIVER_LICENSE
    );
    this.setState({ employees: res.data });
  }

  row() {
    let bthDate = null;
    let expiryDate = null;
    return this.state.employees.map((element, index) => {
      bthDate = element.birthDate.slice(0, 10);
      expiryDate = element.expiryDate.slice(0, 10);
      return (
        <tr key={`${index}`}>
          <td>{index + 1}</td>
          <td>{element.lastName}</td>
          <td>{element.firstName}</td>
          <td>{bthDate}</td>
          <td>{expiryDate}</td>
          <td>{element.divisionNumber}</td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div className="expiry-driver-license">
        <h3>Водители, у которых заканчиваются права</h3>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Фамилия</th>
              <th>Имя, Отчество</th>
              <th>Дата рождения</th>
              <th>Дата окончания</th>
              <th>Смена</th>
            </tr>
          </thead>
          <tbody>{this.row()}</tbody>
        </Table>
      </div>
    );
  }
}
export default ExpiryDriverLicense;
