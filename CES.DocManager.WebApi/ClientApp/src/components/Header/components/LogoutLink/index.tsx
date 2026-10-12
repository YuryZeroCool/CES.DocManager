import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  ActionIcon,
  Flex,
  Text,
  rem,
} from '@mantine/core';
import { IconLogout, IconX } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';

import logout from 'redux/actions/logout';
import { RootState } from 'redux/reducers/combineReducers';
import {
  setEmail, setRole, setToken, setUserName,
} from 'redux/reducers/loginReducer';
import { IAuthResponseType } from 'redux/store/configureStore';
import { UserState } from 'types/UserTypes';

function clearClientSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('email');
  localStorage.removeItem('userName');
  localStorage.removeItem('role');
}

function LogoutLinkContainer() {
  const user = useSelector<RootState, UserState>((state) => state.login);
  const dispatch: IAuthResponseType = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout(user.email))
      .unwrap()
      .then(() => {
        clearClientSession();
        dispatch(setUserName(''));
        dispatch(setToken(''));
        dispatch(setEmail(''));
        dispatch(setRole(''));
        navigate('/login', { replace: true, state: { fromPage: '/' } });
      })
      .catch(() => {
        showNotification({
          title: 'Не удалось выйти из аккаунта',
          message: 'Произошла ошибка во время выхода из аккаунта.',
          icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
          styles: { icon: { background: 'red' } },
        });
      });
  };

  return (
    <Flex align="center" gap={10}>
      <Text c="#FFF">
        Привет,
        &nbsp;
        {user.userName}
      </Text>

      <ActionIcon variant="subtle" onClick={handleClick}>
        <IconLogout style={{ width: '25px', height: '25px' }} />
      </ActionIcon>
    </Flex>
  );
}

export default LogoutLinkContainer;
