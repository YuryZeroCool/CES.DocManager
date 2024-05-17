import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import {
  Box,
  Container,
  Flex,
  Select,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';

import { RootState } from '../../redux/reducers/combineReducers';
import { UserState } from '../../types/UserTypes';
import LogoutLink from './components/LogoutLink';
import { NAV_LINKS, REPORT_OPTIONS } from './constants';
import classes from './header.module.scss';

function Header() {
  const user = useSelector<RootState, UserState>((state) => state.login);
  const [report, setReport] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/report/materialReport' || location.pathname === '/report/fuelReport') {
      const currentReport = localStorage.getItem('currentReport') ?? '';
      setReport(currentReport);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string | null) => {
    setReport(value);
    if (value === 'materialReport') {
      navigate('/report/materialReport');
    }
    if (value === 'fuelReport') {
      navigate('/report/fuelReport');
    }
    if (value) {
      localStorage.setItem('currentReport', value);
    }
  };

  return (
    <header className={classes.header}>
      <Container size={1440}>
        <Flex align="center" justify="space-between">
          <NavLink to="/">
            <Box className={classes.logoContainer} />
          </NavLink>

          <Flex justify="flex-end" align="center" gap={35}>
            <NavLink to="/" className={classes.navLinkItem}>Главная</NavLink>

            <Select
              value={report}
              onChange={(value) => handleChange(value)}
              data={REPORT_OPTIONS}
              classNames={{
                input: classes.selectInput,
              }}
            />

            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={classes.navLinkItem}>
                {link.label}
              </NavLink>
            ))}
          </Flex>

          {user.userName ? <LogoutLink /> : <NavLink to="/login">Войти</NavLink>}
        </Flex>
      </Container>
    </header>
  );
}

export default Header;
