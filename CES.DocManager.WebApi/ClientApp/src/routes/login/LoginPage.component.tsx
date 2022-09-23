import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { IUserRequest } from '../../types/UserTypes';
import './Login.style.scss';

interface Props {
  errorMessage: string;
  onSubmit: SubmitHandler<IUserRequest>;
}

export default function LoginPageComponent({ errorMessage, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRequest>({ mode: 'onBlur' });

  return (
    <section className="section-login">
      <div className="login-container">
        <h3>Добро пожаловать</h3>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail" className="login-email">
            <Form.Control
              type="email"
              placeholder="Введите ваш email"
              className="input-email"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('email', { required: true })}
            />
          </Form.Group>
          <div style={{ height: 40 }}>{errors?.email && <p>This field is required!</p>}</div>
          <Form.Group controlId="formBasicPassword" className="login-password">
            <Form.Control
              type="password"
              placeholder="Пароль"
              className="input-password"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('password', { required: true })}
            />
          </Form.Group>
          <div style={{ height: 40 }}>{errors?.password && <p>This field is required!</p>}</div>
          <Form.Group controlId="formBasicButtons" className="login-btn-container">
            <Button variant="primary" type="submit">
              Войти
            </Button>
            <Button variant="primary" type="submit">
              Забыли пароль?
            </Button>
          </Form.Group>
          <div>
            {errorMessage ? <p className="error-message">{errorMessage}</p> : <p> </p>}
          </div>
        </Form>
      </div>
    </section>
  );
}
