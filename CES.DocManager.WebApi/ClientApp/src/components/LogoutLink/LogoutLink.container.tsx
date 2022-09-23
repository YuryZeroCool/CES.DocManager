import { AxiosError } from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import logout from '../../redux/actions/logout';
import { RootState } from '../../redux/reducers/combineReducers';
import { setEmail, setToken, setUserName } from '../../redux/reducers/loginReducer';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { UserState } from '../../types/UserTypes';
import LogoutLinkComponent from './LogoutLink.component';

function LogoutLinkContainer() {
  const user = useSelector<RootState, UserState>((state) => state.login);
  const dispatch: IAuthResponseType = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    async function logOut() {
      await dispatch(logout(user.email));
      dispatch(setUserName(''));
      dispatch(setToken(''));
      dispatch(setEmail(''));
      navigate('/login', { replace: true, state: { from: '/' } });
    }
    logOut().catch((error) => {
      if (error instanceof Error || error instanceof AxiosError) {
        console.log(error.message);
      }
    });
  };

  return (
    <LogoutLinkComponent handleClick={handleClick} userName={user.userName} />
  );
}

export default LogoutLinkContainer;
