import React from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class ExpiryDriverLicense extends React.Component {
  state = {
    employees: [
      {
        bthDate: '',
        divisionNumber: 0,
        expiryDate: '',
        firstName: '',
        lastName: '',
      },
    ],
    counter: 0,
  };

  componentDidMount() {
    axios.get(`https://localhost:5001/api/Employee/date/100`).then((res) => {
      this.setState({ employees: res.data });
    });
  }

  row() {
    let bthDate = null;
    let expiryDate = null;
    return this.state.employees.map((element, index) => {
      bthDate = element.bthDate.slice(0, 10);
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
      <div>
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
