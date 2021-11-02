import React from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as yup from "yup";

class DriverLicense extends React.Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.validationsSchema = this.validationsSchema.bind(this);
    this.closeDriverLicense = this.closeDriverLicense.bind(this);
  }

  state = {
    drivers: [
      {
        lastName: "",
        firstName: "",
      },
    ],
  };

  closeDriverLicense() {
    this.props.showFormLicense(false);
  }

  submitForm(value) {
    let arrEmp = Object.values(value)[4].split(" ");

    fetch(process.env.REACT_APP_DRIVER_LICENSES, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-headers': 'X-Custom-Header',
      },
      body: JSON.stringify({
        firstName: arrEmp[1] + " " + arrEmp[2],
        lastName: arrEmp[0],
        serialNumber: value.serialNumber,
        issueDate: value.issueDate,
        expiryDate: value.expiryDate,
        category: value.category,
      }),
    });
     this.closeDriverLicense();
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_NO_DRIVER_LICENSE
      )
      .then((res) => {
        this.setState({ drivers: res.data });
      });
  }

  row() {
    return this.state.drivers.map((el, index) => {
      return <option key={index}>{el.lastName + " " + el.firstName}</option>;
    });
  }

  validationsSchema() {
    return yup.object().shape({
      serialNumber: yup
        .string()
        .typeError("Должно быть строкой")
        .required("Обязательно для заполнения")
        .test(
          'serialNumber',
          'Удостоверение с таким номеров уже существует',
          async (value) => {
            if (value !== undefined) {
              const res = await fetch(
               `${process.env.REACT_APP_IS_SERIAL_NUMBER}${value}`
              );

              if (await res.json()) {
                return false;
              }
              return true;
            }
          }
        ),
      issueDate: yup
        .date()
        .typeError("Выберите дату выдачи прав")
        .required("Обязательно для заполнения"),
      expiryDate: yup
        .date()
        .min(new Date(1950, 0, 1))
        .max(new Date(2050, 11, 31))
        .typeError("Выберите дату окончания прав")
        .required("Обязательно для заполнения"),
      category: yup
        .string()
        .typeError("Введите категорию")
        .required("Обязательно для заполнения"),
      lastName: yup
        .string()
        .typeError("Выберите ФИО водителя")
        .required("Обязательно для заполнения"),
    });
  }

  render() {
    return (
      <>
        <Formik
          initialValues={{
            serialNumber: "",
            issueDate: "",
            expiryDate: "",
            category: "",
            lastName: "",
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
                <Form.Group as={Col} controlId="formGridSerialNumber">
                  <Form.Label>Серийный номер</Form.Label>
                  <Form.Control
                    type={"text"}
                    name={"serialNumber"}
                    placeholder="Введите серийный номер"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.serialNumber}
                  />

                  {touched.serialNumber && errors.serialNumber ? (
                    <p>{errors.serialNumber}</p>
                  ) : null}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridIssueDate">
                  <Form.Label>Дата выдачи</Form.Label>
                  <Form.Control
                    type={"date"}
                    min="1950-01-01"
                    max="2050-12-31"
                    name={"issueDate"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.issueDate}
                  />
                  {touched.issueDate && errors.issueDate ? (
                    <p>{errors.issueDate}</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridExpiryDate">
                  <Form.Label>Дата окончания прав</Form.Label>
                  <Form.Control
                    type={"date"}
                    min="2000-01-01"
                    max="2050-12-31"
                    name={"expiryDate"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.expiryDate}
                  />
                  {touched.expiryDate && errors.expiryDate ? (
                    <p>{errors.expiryDate}</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCategory">
                  <Form.Label>Категории</Form.Label>
                  <Form.Control
                    type={"text"}
                    name={"category"}
                    placeholder="Введите категории"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                  />

                  {touched.category && errors.category ? (
                    <p>{errors.category}</p>
                  ) : null}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Фамилия водителя</Form.Label>
                  <Form.Control
                    as="select"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  >
                    <option>Выбрать фамилию водителя...</option>
                    {this.row()}
                  </Form.Control>
                  {touched.lastName && errors.lastName ? (
                    <p>{errors.lastName}</p>
                  ) : (
                    <p></p>
                  )}
                </Form.Group>
              </Form.Row>

              <Button
                variant="primary"
                type={"submit"}
                disable={(!isValid && !dirty).toString()}
              >
                Сохранить
              </Button>

              <Button
                variant="primary"
                type={"button"}
                onClick={this.closeDriverLicense}
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

export default DriverLicense;
