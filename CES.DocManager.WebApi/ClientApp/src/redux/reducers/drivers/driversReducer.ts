import { createSlice } from '@reduxjs/toolkit';
import { IDriverResponse } from '../../../types/DriversType';
import createDriver from '../../actions/drivers/createDriver';
import getIsPersonnelNumberExist from '../../actions/drivers/getIsPersonnelNumberExist';

const initial: IDriverResponse = {
  createdDriver: {
    id: 0,
    firstName: '',
    lastName: '',
    dateBirth: '',
    divisionNumber: '',
    personnelNumber: 0,
  },
  isPersonnelNumberExist: false,
};

const driversReducer = createSlice({
  name: 'drivers',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    // create driver
    builder.addCase(createDriver.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, createdDriver: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(createDriver.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    // check if personnel number exist
    builder.addCase(getIsPersonnelNumberExist.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, isPersonnelNumberExist: action.payload };
      return stateCopy;
    });
    builder.addCase(getIsPersonnelNumberExist.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default driversReducer.reducer;
