import { createSlice } from '@reduxjs/toolkit';
import { IExpiringDocuments } from '../../../types/HomeTypes';
import getExpiringDriverLicense from '../../actions/home/getExpiringDriverLicense';

const initialDriverLicense: IExpiringDocuments[] = [];

const driverLicenseReducer = createSlice({
  name: 'getDriverLicense',
  initialState: initialDriverLicense,
  reducers: {
    clearDriverLicenseState: () => initialDriverLicense,
  },
  extraReducers: (builder) => {
    builder.addCase(getExpiringDriverLicense.fulfilled, (state, action) => {
      const stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        stateCopy.push.apply(state, action.payload);
      }
    });
    builder.addCase(getExpiringDriverLicense.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const { clearDriverLicenseState } = driverLicenseReducer.actions;
export default driverLicenseReducer.reducer;
