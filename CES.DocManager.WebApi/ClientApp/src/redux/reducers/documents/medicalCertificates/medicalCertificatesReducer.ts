import { createSlice } from '@reduxjs/toolkit';
import { FullName, IMedicalCertificates } from '../../../../types/DocumentType';
import createMedicalCertificate from '../../../actions/documents/createMedicalCertificate';
import getDriversWithoutMedicalCertificate from '../../../actions/documents/getDriversWithoutMedicalCertificate';
import getExpiringMedicalCertificate from '../../../actions/home/getExpiringMedicalCertificate';

const initialMedicalCertificates: IMedicalCertificates = {
  expiringMedicalCertificate: [],
  createdMedicalCertificate: {
    id: 0,
    firstName: '',
    lastName: '',
    serialNumber: '',
    issueDate: null,
    expiryDate: null,
  },
  driversWithoutMedicalCertificates: [],
};

const medicalCertificatesReducer = createSlice({
  name: 'medicalCertificates',
  initialState: initialMedicalCertificates,
  reducers: {
    clearExpiringMedicalCertificate: (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, expiringMedicalCertificate: [] };
      return stateCopy;
    },
    clearDriversWithoutMedicalCertificates: (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, driversWithoutMedicalCertificates: [] };
      return stateCopy;
    },
  },
  extraReducers: (builder) => {
    // get Expiring Medical Certificate
    builder.addCase(getExpiringMedicalCertificate.fulfilled, (state, action) => {
      let stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        stateCopy = { ...stateCopy, expiringMedicalCertificate: [...action.payload] };
      }
      return stateCopy;
    });
    builder.addCase(getExpiringMedicalCertificate.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    // create Medical Certificate
    builder.addCase(createMedicalCertificate.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, createdMedicalCertificate: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(createMedicalCertificate.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    // get Drivers Without Medical Certificates
    builder.addCase(
      getDriversWithoutMedicalCertificate.fulfilled,
      (state, action) => {
        const stateCopy = state;
        if (typeof action.payload !== 'undefined') {
          action.payload.map((el) => {
            const driverFullName: FullName = {
              id: el.id,
              driversFullName: `${el.lastName} ${el.firstName}`,
            };
            stateCopy.driversWithoutMedicalCertificates.push(driverFullName);
            return stateCopy;
          });
        }
        return stateCopy;
      },
    );
    builder.addCase(getDriversWithoutMedicalCertificate.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const {
  clearExpiringMedicalCertificate,
  clearDriversWithoutMedicalCertificates,
} = medicalCertificatesReducer.actions;
export default medicalCertificatesReducer.reducer;
