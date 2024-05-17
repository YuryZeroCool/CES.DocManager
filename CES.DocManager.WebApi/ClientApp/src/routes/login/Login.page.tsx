import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { z } from 'zod';
import {
  Button, Group, PasswordInput, Stack, Text, TextInput,
  rem,
} from '@mantine/core';
import { IconLock, IconUserFilled } from '@tabler/icons-react';
import login from '../../redux/actions/login';
import { setEmail, setToken, setUserName } from '../../redux/reducers/loginReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { IUserRequest } from '../../types/UserTypes';
import './Login.style.scss';

interface CustomizedState {
  fromPage: string;
}

const defaultLocationState = {
  fromPage: '/',
};

const schema = z.object({
  password: z.string().min(1, 'Пожалуйста, введите пароль').max(50),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g, 'Пожалуйста, введите валидный email'),
});

type FormDataType = z.infer<typeof schema>;

function LoginPage() {
  const dispatch: IAuthResponseType = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { fromPage } = location.state as CustomizedState
    ? location.state as CustomizedState : defaultLocationState;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      email: '',
    },
  });

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
    <Stack className="section-login">
      <Stack className="login-container" p={20}>
        <Text
          ta="center"
          fz={20}
        >
          Добро пожаловать
        </Text>

        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={35}>
            <Stack>
              <Group>
                <TextInput
                  w="100%"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('email', { required: true })}
                  placeholder="Введите ваш email"
                  label="Email"
                  leftSection={
                    <IconUserFilled style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                  }
                  error={errors.email?.message}
                />
              </Group>
              <Group>
                <PasswordInput
                  w="100%"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('password', { required: true })}
                  placeholder="Введите ваш пароль"
                  label="Пароль"
                  leftSection={
                    <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                  }
                  error={errors.password?.message}
                />
              </Group>

              {errorMessage && (
                <Text c="red" ta="center" fz={14}>{errorMessage}</Text>
              )}
            </Stack>

            <Button
              variant="gradient"
              gradient={{ from: 'violet', to: 'blue', deg: 90 }}
              type="submit"
            >
              Войти
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
