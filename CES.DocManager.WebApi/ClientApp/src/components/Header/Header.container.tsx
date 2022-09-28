import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../../redux/reducers/combineReducers';
import { UserState } from '../../types/UserTypes';
import HeaderComponent from './Header.component';

function HeaderContainer() {
  const user = useSelector<RootState, UserState>((state) => state.login);
  const [report, setReport] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setReport(event.target.value);
    navigate(`/report/${event.target.value}`);
  };

  return (
    <HeaderComponent user={user} handleChange={handleChange} report={report} />
  );
}

export default HeaderContainer;
