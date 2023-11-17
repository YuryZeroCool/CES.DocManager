import { createSlice } from '@reduxjs/toolkit';
import createDriver from '../../actions/drivers/createDriver';
import getIsPersonnelNumberExist from '../../actions/drivers/getIsPersonnelNumberExist';
import getDriverByCarNumber from '../../actions/drivers/getDriversByCarNumber';
import { IDriverResponse } from '../../../types/DriversType';

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
  driversByCarNumber: [],
};

const driversReducer = createSlice({
  name: 'drivers',
  initialState: initial,
  reducers: {
    resetDriversByCar: (state) => {
      let stateCopy: IDriverResponse = state;

      stateCopy = {
        ...stateCopy,
        driversByCarNumber: [],
      };
      return stateCopy;
    },
  },
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

    builder.addCase(getDriverByCarNumber.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, driversByCarNumber: action.payload };
      return stateCopy;
    });
    builder.addCase(getDriverByCarNumber.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  resetDriversByCar,
} = driversReducer.actions;
export default driversReducer.reducer;
