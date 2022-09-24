import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers/combineReducers';
import { UserState } from '../types/UserTypes';

type Props = {
  children: ReactElement;
};

export default function RequireAuth({ children }: Props) {
  const location = useLocation();
  const user = useSelector<RootState, UserState>((state) => state.login);

  if (!user.userName) {
    return <Navigate to="/login" state={{ fromPage: location.pathname || '/' }} />;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { children }
    </>
  );
}
