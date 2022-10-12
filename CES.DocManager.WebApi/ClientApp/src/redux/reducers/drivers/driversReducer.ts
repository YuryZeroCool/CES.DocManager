import { createSlice } from '@reduxjs/toolkit';
import { IDriverResponse } from '../../../types/DriversType';
import createDriver from '../../actions/drivers/createDriver';

const initial: IDriverResponse = {
  createdDriver: {
    id: 0,
    firstName: '',
    lastName: '',
    dateBirth: '',
    divisionNumber: '',
    personnelNumber: 0,
  },
};

const driversReducer = createSlice({
  name: 'divisionWorkSchedule',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDriver.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, createdDriver: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(createDriver.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default driversReducer.reducer;
