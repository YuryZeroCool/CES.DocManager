import { createSlice } from '@reduxjs/toolkit';
import { FullName, IDriverLicenses } from '../../../../types/DocumentType';
import createDriverLicense from '../../../actions/documents/createDriverLicense';
import getDriversWithoutDriverLicense from '../../../actions/documents/getDriversWithoutDriverLicense';
import getExpiringDriverLicense from '../../../actions/home/getExpiringDriverLicense';

const initialDriverLicense: IDriverLicenses = {
  expiringDriverLicenses: [],
  createdDriverLicense: {
    id: 0,
    firstName: '',
    lastName: '',
    serialNumber: '',
    issueDate: null,
    expiryDate: null,
    category: '',
  },
  driversWithoutDriverLicense: [],
};

const driverLicenseReducer = createSlice({
  name: 'driverLicense',
  initialState: initialDriverLicense,
  reducers: {
    clearExpiringDriverLicensesState: (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, expiringDriverLicenses: [] };
      return stateCopy;
    },
    clearDriversWithoutDriverLicense: (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, driversWithoutDriverLicense: [] };
      return stateCopy;
    },
  },
  extraReducers: (builder) => {
    // get Expiring Driver License
    builder.addCase(getExpiringDriverLicense.fulfilled, (state, action) => {
      let stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        stateCopy = { ...stateCopy, expiringDriverLicenses: [...action.payload] };
      }
      return stateCopy;
    });
    builder.addCase(getExpiringDriverLicense.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    // create driver License
    builder.addCase(createDriverLicense.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, createdDriverLicense: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(createDriverLicense.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    // get Drivers Without Driver License
    builder.addCase(getDriversWithoutDriverLicense.fulfilled, (state, action) => {
      const stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        action.payload.map((el) => {
          const driverFullName: FullName = {
            id: el.id,
            driversFullName: `${el.lastName} ${el.firstName}`,
          };
          stateCopy.driversWithoutDriverLicense.push(driverFullName);
          return stateCopy;
        });
      }
      return stateCopy;
    });
    builder.addCase(getDriversWithoutDriverLicense.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  clearExpiringDriverLicensesState,
  clearDriversWithoutDriverLicense,
} = driverLicenseReducer.actions;
export default driverLicenseReducer.reducer;
