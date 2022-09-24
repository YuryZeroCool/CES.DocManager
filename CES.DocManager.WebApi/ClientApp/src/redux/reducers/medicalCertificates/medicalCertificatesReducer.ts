import { createSlice } from '@reduxjs/toolkit';
import { IExpiringDocuments } from '../../../types/HomeTypes';
import createMedicalCertificate from '../../actions/documents/createMedicalCertificate';
import getExpiringMedicalCertificate from '../../actions/home/getExpiringMedicalCertificate';

const initialMedicalCertificates: IExpiringDocuments[] = [];

const medicalCertificatesReducer = createSlice({
  name: 'medicalCertificates',
  initialState: initialMedicalCertificates,
  reducers: {
    clearMedicalCertificatesState: () => initialMedicalCertificates,
  },
  extraReducers: (builder) => {
    builder.addCase(getExpiringMedicalCertificate.fulfilled, (state, action) => {
      const stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        stateCopy.push.apply(state, action.payload);
      }
    });
    builder.addCase(getExpiringMedicalCertificate.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
    // createMedicalCertificate
    builder.addCase(createMedicalCertificate.fulfilled, (state, action) => {
      const stateCopy = state;
      console.log('createMedicalCertificate.fulfilled');
    });
    builder.addCase(createMedicalCertificate.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export const { clearMedicalCertificatesState } = medicalCertificatesReducer.actions;
export default medicalCertificatesReducer.reducer;
