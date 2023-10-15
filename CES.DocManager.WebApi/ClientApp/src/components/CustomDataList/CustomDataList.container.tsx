import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import CustomDataListComponent from './CustomDataList.component';
import { RootState } from '../../redux/reducers/combineReducers';
import { IAuthResponseType } from '../../redux/store/configureStore';
import { INotesState } from '../../types/MesTypes';
import organizationsBySearch from '../../redux/actions/mes/organizationsBySearch';

function CustomDataListContainer() {
  const [selectedOption, setSelectedOption] = useState('');
  const {
    allOrganizationsBySearch,
  } = useSelector<RootState, INotesState>(
    (state) => state.mes,
  );

  const dispatch: IAuthResponseType = useDispatch();

  const handleInputChange = (value: string) => {
    setSelectedOption(value);
    dispatch(organizationsBySearch(value))
      .catch((error) => {
        if (error instanceof Error || error instanceof AxiosError) {
          // handleChangeErrorMessage(error.message);
          console.log(error.message);
        }
      });
  };
  return (
    <CustomDataListComponent
      id="options"
      selectedOption={selectedOption}
      handleInputChange={handleInputChange}
      options={allOrganizationsBySearch}
    />
  );
}

export default CustomDataListContainer;
