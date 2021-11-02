import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import '../styles/employee.scss';

class Employee extends React.Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.validationsSchema = this.validationsSchema.bind(this);
    this.closeEmployee = this.closeEmployee.bind(this);
  }
  state = {
    divisions: [
      {
        divisionNamber: '',
      },
    ],
  };

  closeEmployee() {
    this.props.show(false);
  }

  submitForm(value) {
    fetch(process.env.REACT_APP_EMPLOYEE, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-headers': 'X-Custom-Header',
      },
      body: JSON.stringify(value),
    });
    this.closeEmployee();
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_DIVISION).then((res) => {
      this.setState({ divisions: res.data });
    });
  }
  row() {
    return this.state.divisions.map((el, index) => {
      return <option key={index}>{el.divisionNamber}</option>;
    });
  }

  validationsSchema() {
    return yup.object().shape({
      lastName: yup
        .string()
        .typeError('Должно быть строкой')
        .required('Обязательно для заполнения'),
      firstName: yup
        .string()
        .typeError('Должно быть строкой')
        .required('Обязательно для заполнения'),
      birthDate: yup
        .date()
        .min(new Date(1940, 0, 1), 'Ты не такой старый')
        .max(new Date(), 'Ты сегодня родился?')
        .typeError('Введите дату рождения в верном формате')
        .required('Обязательно для заполнения'),
      divisionNumber: yup
        .string()
        .typeError('Выберите смену')
        .required('Обязательно для заполнения'),
      personnelNumber: yup
        .number()
        .typeError('Вводите только цифры')
        .required('Обязательно для заполнения')
        .test(
          'personnelNumber',
          'Такой табельный номер существует',
          async (value) => {
            if (value !== undefined) {
              const res = await fetch(
               `${process.env.REACT_APP_IS_PERSONAL_NUMBER}${value}`
              );

              if (await res.json()) {
                return false;
              }
              return true;
            }
          }
        ),
    });
  }

  render() {
    return (
      <>
        <h3>Добавление нового водителя</h3>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            divisionNumber: '',
            personnelNumber: '',
            birthDate: '',
          }}
          validateOnBlur={true}
          validateOnChange={false}
          onSubmit={(value) => this.submitForm(value)}
          validationSchema={this.validationsSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Фамилия</Form.Label>
                  <Form.Control
                    type={'text'}
                    name={'lastName'}
                    placeholder="Введите фамилию"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />

                  {touched.lastName && errors.lastName ? (
                    <p>{errors.lastName}</p>
                  ) : null}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>Имя и отчество</Form.Label>
                  <Form.Control
                    type={'text'}
                    placeholder="Введите имя и отчество"
                    name={'firstName'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                  {touched.firstName && errors.firstName ? (
                    <p>{errors.firstName}</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridBirthDate">
                  <Form.Label>Дата рождения</Form.Label>
                  <Form.Control
                    type={'date'}
                    min="1940-01-01"
                    max="2050-12-31"
                    name={'birthDate'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.birthDate}
                  />
                  {touched.birthDate && errors.birthDate ? (
                    <p>{errors.birthDate}</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridDivision">
                  <Form.Label>Смена</Form.Label>
                  <Form.Control
                    as="select"
                    name="divisionNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.divisionNumber}
                  >
                    <option>Выбрать смену...</option>
                    {this.row()}
                  </Form.Control>
                  {touched.divisionNumber && errors.divisionNumber ? (
                    <p>{errors.divisionNumber}</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPersonnelNumber">
                  <Form.Label>Табельный номер</Form.Label>
                  <Form.Control
                    type={'text'}
                    name="personnelNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.personnelNumber}
                  />
                  {touched.personnelNumber && errors.personnelNumber ? (
                    <p>{errors.personnelNumber}</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </Form.Row>

              <Button
                variant="primary"
                type={'submit'}
                disable={(!isValid && !dirty).toString()}
              >
                Сохранить
              </Button>

              <Button
                variant="primary"
                type={'button'}
                onClick={this.closeEmployee}
              >
                Закрыть
              </Button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
export default Employee;
