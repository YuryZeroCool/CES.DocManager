import { createSlice } from '@reduxjs/toolkit';
import { IExpiringDocuments } from '../../../../types/HomeTypes';

import getExpiringDriverLicense from '../../../actions/home/driverLicenseRedux';

const initialDriverLicense: IExpiringDocuments[] = [];

const exringDriverLicenseReducer = createSlice({
  name: 'driverLicense',
  initialState: initialDriverLicense,
  reducers: {
    clearDriverLicenseState: () => initialDriverLicense,
  },
  extraReducers: (builder) => {
    builder.addCase(getExpiringDriverLicense.pending, (state) => {
      const stateCopy = state;
    });
    builder.addCase(getExpiringDriverLicense.fulfilled, (state, action) => {
      const stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        stateCopy.push.apply(state, action.payload);
      }
    });
    builder.addCase(getExpiringDriverLicense.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const { clearDriverLicenseState } = exringDriverLicenseReducer.actions;
export default exringDriverLicenseReducer.reducer;
