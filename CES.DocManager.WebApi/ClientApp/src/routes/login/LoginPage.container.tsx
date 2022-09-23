import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import login from '../../redux/actions/login';
import { setEmail, setToken, setUserName } from '../../redux/reducers/loginReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IUserRequest } from '../../types/UserTypes';
import LoginPageComponent from './LoginPage.component';

interface CustomizedState {
  fromPage: string;
}

const defaultLocationState = {
  fromPage: '/',
};

function LoginPageContainer() {
  const dispatch: IAuthResponseType = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { fromPage } = location.state as CustomizedState
    ? location.state as CustomizedState : defaultLocationState;

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
      await dispatch(login(user));
      navigate((fromPage || '/'), { replace: true });
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <LoginPageComponent
      errorMessage={errorMessage}
      onSubmit={onSubmit}
    />
  );
}

export default LoginPageContainer;
