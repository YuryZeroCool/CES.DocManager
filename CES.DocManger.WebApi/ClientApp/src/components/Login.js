import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/login.scss";

export class Login extends React.Component {
  render() {
    return (
      <section className="section-login">
        <div className="login-container">
          <h3>Добро пожаловать</h3>
          <Form className="login-form">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Введите ваш email"
                className="input-email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Пароль"
                className="input-password"
              />
            </Form.Group>

            <Form.Group controlId="formBasicButtons">
              <Button variant="primary" type="submit">
                Войти
              </Button>
              <Button variant="primary" type="submit">
                Забыли пароль?
              </Button>
            </Form.Group>
          </Form>
        </div>
      </section>
    );
  }
}
