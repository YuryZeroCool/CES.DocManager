import { createSlice } from '@reduxjs/toolkit';
import { IExpiringDocuments } from '../../../../types/HomeTypes';
import createMedicalCertificate from '../../../actions/documents/createMedicalCertificateRedux';
import getExpiringMedicalCertificate from '../../../actions/home/medicalCertificatesRedux';

const initialMedicalCertificates: IExpiringDocuments[] = [];

const exringMedicalCertificatesReducer = createSlice({
  name: 'medicalCertificates',
  initialState: initialMedicalCertificates,
  reducers: {
    clearMedicalCertificatesState: () => initialMedicalCertificates,
  },
  extraReducers: (builder) => {
    builder.addCase(getExpiringMedicalCertificate.pending, (state) => {
      const stateCopy = state;
    });
    builder.addCase(getExpiringMedicalCertificate.fulfilled, (state, action) => {
      const stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        stateCopy.push.apply(state, action.payload);
      }
    });
    builder.addCase(getExpiringMedicalCertificate.rejected, (state, action) => {
      const stateCopy = state;
      console.error(action.error.message);
    });
    // createMedicalCertificate
    builder.addCase(createMedicalCertificate.pending, (state) => {
      const stateCopy = state;
      console.log('createMedicalCertificate.loading');
    });
    builder.addCase(createMedicalCertificate.fulfilled, (state, action) => {
      const stateCopy = state;
      console.log('createMedicalCertificate.fulfilled');
    });
    builder.addCase(createMedicalCertificate.rejected, (state, action) => {
      const stateCopy = state;
      console.log(action.error);
    });
  },
});

export const { clearMedicalCertificatesState } = exringMedicalCertificatesReducer.actions;
export default exringMedicalCertificatesReducer.reducer;
