import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store/reducers/combineReducers';
import '../../styles/header.scss';
import { UserState } from '../../types/UserTypes';
import LogoutLink from './LogoutLink';

export default function Header() {
  // const userName: string | null = localStorage.getItem('userName');
  const user = useSelector<RootState, UserState>((state) => state.login);
  return (
    <header>
      <div className="wrapper">
        <div className="header-container">
          <div className="logo-container" />
          <nav>
            <NavLink to="/">Главная</NavLink>
            <NavLink to="/report">Отчёты</NavLink>
            <NavLink to="/documents">Документы</NavLink>
            <NavLink to="/technique">Техника</NavLink>
            <NavLink to="/drivers">Водители</NavLink>
            {user.userName ? <LogoutLink /> : <NavLink to="/login">Войти</NavLink>}
            {/* <NavLink to="/login" className="logout-link">
            </NavLink> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
