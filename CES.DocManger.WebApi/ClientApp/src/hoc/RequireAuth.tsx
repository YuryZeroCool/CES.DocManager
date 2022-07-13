import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router';
import { RootState } from '../redux/store/reducers/combineReducers';
import { UserState } from '../types/UserTypes';

interface PropsType {
  children: React.ReactNode;
}

export default function RequireAuth(props: PropsType) {
  const location = useLocation();
  const user = useSelector<RootState, UserState>((state) => state.login);
  const { children } = props;

  if (!user.userName) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { children }
    </>
  );
}
