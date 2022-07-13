import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { IUserRequest } from '../../types/UserTypes';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { setEmail, setToken, setUserName } from '../../redux/store/reducers/loginReducer';
import login from '../../redux/actions/loginRedux';
import '../../styles/login.scss';

interface CustomizedState {
  from: string;
}

export default function Login() {
  const dispatch: IAuthResponseType = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state as CustomizedState;
  const fromPage = '/' || from;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRequest>({ mode: 'onBlur' });

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    if (userName && token && email) {
      dispatch(setUserName(userName));
      dispatch(setToken(token));
      dispatch(setEmail(email));
      navigate(fromPage, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<IUserRequest> = async (user: IUserRequest): Promise<void> => {
    try {
      const response = await dispatch(login(user));
      if (response.type === 'jwt/fulfilled') {
        navigate(fromPage, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        </Form>
      </div>
    </section>
  );
}
