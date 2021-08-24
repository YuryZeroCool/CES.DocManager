import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Employee extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    divisions: [
      {
        divisionNamber: '',
      },
    ],
    data: {
      firstName: '',
      lastName: '',
      divisionNumber: '',
      personnelNumber: null,
      birthDate: '',
      id: 0,
    },
  };

  handleChange(event) {
    let key = { ...this.state.data };
    key[event.target.name] = event.target.value;
    this.setState({ data: key });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('https://localhost:5001/api/Employee', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-headers': 'X-Custom-Header',
      },
      body: JSON.stringify(this.state.data),
    });
    this.props.close(false);
  }

  componentDidMount() {
    axios.get(`https://localhost:5001/api/Division`).then((res) => {
      this.setState({ divisions: res.data });
    });
  }
  row() {
    return this.state.divisions.map((el, index) => {
      return <option key={index}>{el.divisionNamber}</option>;
    });
  }

  render() {
    return (
      <>
        <Form
          method="post"
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Введите фамилию"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>Имя и отчество</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя и отчество"
                name="firstName"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridBirthDate">
              <Form.Label>Дата рождения</Form.Label>
              <Form.Control
                type="date"
                min="1940-01-01"
                max="2050-12-31"
                name="birthDate"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          {/* <Form.Row>
            <Form.Group as={Col} controlId="formGridDriverLicense">
              <Form.Label>Серия прав</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите серию прав"
                name="driverLicense"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridIssueDate">
              <Form.Label>Дата выдачи прав</Form.Label>
              <Form.Control
                type="date"
                name="issueDate"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridExpirySate">
              <Form.Label>Действительно до</Form.Label>
              <Form.Control
                type="date"
                name="expirySate"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row> */}

          <Form.Row>
            {/* <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>Категория</Form.Label>
              <Form.Control
                type="text"
                name="category"
                onChange={this.handleChange}
              />
            </Form.Group> */}

            <Form.Group as={Col} controlId="formGridDivision">
              <Form.Label>Смена</Form.Label>
              <Form.Control
                as="select"
                defaultValue="Выбрать смену..."
                name="divisionNumber"
                onChange={this.handleChange}
              >
                <option>Выбрать смену...</option>
                {this.row()}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPersonnelNumber">
              <Form.Label>Табельный номер</Form.Label>
              <Form.Control
                type="text"
                name="personnelNumber"
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Все верно" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Form>
      </>
    );
  }
}
export default Employee;
