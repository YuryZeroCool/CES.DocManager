import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './AddEmployee.scss';

export default function AddEmployeeComponent() {
  return (
    <section>
      <h3>Добавление нового водителя</h3>
      <Form>
        <Row>
          <Col controlId="formGridLastName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Введите фамилию"
            />
          </Col>
          <Col controlId="formGridFirstName">
            <Form.Label>Имя и отчество</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя и отчество"
              name="firstName"
            />
          </Col>
          <Col controlId="formGridBirthDate">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type="date"
              min="1940-01-01"
              max="2050-12-31"
              name="birthDate"
            />
          </Col>
        </Row>

        <Row>
          <Col controlId="formGridDivision">
            <Form.Label>Смена</Form.Label>
            <Form.Control as="select" name="divisionNumber">
              <option>Выбрать смену...</option>
            </Form.Control>
          </Col>
          <Col controlId="formGridPersonnelNumber">
            <Form.Label>Табельный номер</Form.Label>
            <Form.Control type="text" name="personnelNumber" />
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Сохранить
        </Button>

        <Button variant="primary" type="button">
          Закрыть
        </Button>
      </Form>
    </section>
  );
}
