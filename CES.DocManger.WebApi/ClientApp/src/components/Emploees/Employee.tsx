import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../../styles/employee.scss";

export const Employee = () => {
  return (
    <>
      <h3>Добавление нового водителя</h3>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type={"text"}
              name={"lastName"}
              placeholder="Введите фамилию"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>Имя и отчество</Form.Label>
            <Form.Control
              type={"text"}
              placeholder="Введите имя и отчество"
              name={"firstName"}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridBirthDate">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control
              type={"date"}
              min="1940-01-01"
              max="2050-12-31"
              name={"birthDate"}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridDivision">
            <Form.Label>Смена</Form.Label>
            <Form.Control as="select" name="divisionNumber">
              <option>Выбрать смену...</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPersonnelNumber">
            <Form.Label>Табельный номер</Form.Label>
            <Form.Control type={"text"} name="personnelNumber" />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type={"submit"}>
          Сохранить
        </Button>

        <Button variant="primary" type={"button"}>
          Закрыть
        </Button>
      </Form>
    </>
  );
};
