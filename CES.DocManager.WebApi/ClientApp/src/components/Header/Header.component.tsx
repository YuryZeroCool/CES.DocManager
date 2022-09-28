import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UserState } from '../../types/UserTypes';
import LogoutLink from '../LogoutLink/LogoutLink.container';
import './Header.style.scss';

interface Props {
  user: UserState;
  report: string;
  handleChange: (event: SelectChangeEvent) => void;
}

export default function HeaderComponent(props: Props) {
  const { user, report, handleChange } = props;

  return (
    <header className="header">
      <div className="wrapper">
        <div className="header-container">
          <div className="logo-container" />
          <nav className="nav">
            <NavLink to="/">Главная</NavLink>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <Select
                  id="demo-simple-select"
                  displayEmpty
                  value={report}
                  label="Отчёты"
                  onChange={handleChange}
                  className="report-type-select"
                >
                  <MenuItem disabled value="">Отчёты</MenuItem>
                  <MenuItem className="MenuItem" value="materialReport">
                    Материальный отчет
                  </MenuItem>
                  <MenuItem className="MenuItem" value="fuelReport">
                    Топливный отчет
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <NavLink to="/documents">Документы</NavLink>
            <NavLink to="/technique">Техника</NavLink>
            <NavLink to="/drivers">Водители</NavLink>
            {user.userName ? <LogoutLink /> : <NavLink to="/login">Войти</NavLink>}
          </nav>
        </div>
      </div>
    </header>
  );
}
