import React, { useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { RootState } from '../../redux/reducers/combineReducers';
import { UserState } from '../../types/UserTypes';
import HeaderComponent from './Header.component';

function HeaderContainer() {
  const user = useSelector<RootState, UserState>((state) => state.login);
  const [report, setReport] = React.useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/report/materialReport' || location.pathname === '/report/fuelReport') {
      const currentReport = localStorage.getItem('currentReport') ?? '';
      setReport(currentReport);
    }
  }, [location]);

  const handleChange = (event: SelectChangeEvent) => {
    setReport(event.target.value);
    localStorage.setItem('currentReport', event.target.value);
  };

  return (
    <HeaderComponent user={user} handleChange={handleChange} report={report} />
  );
}

export default HeaderContainer;
