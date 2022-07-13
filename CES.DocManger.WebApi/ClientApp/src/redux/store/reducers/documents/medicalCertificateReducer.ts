import { createSlice } from '@reduxjs/toolkit';
import createMedicalCertificate from '../../../actions/documents/createMedicalCertificateRedux';

const initial = {
  status: 0,
};

const medicalCertificateReducer = createSlice({
  name: 'medicalCertificate',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMedicalCertificate.pending, (state) => {
      const stateCopy = state;
      console.log('loading');
    });
    builder.addCase(createMedicalCertificate.fulfilled, (state, action) => {
      const stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        console.log('OK');
      }
    });
    builder.addCase(createMedicalCertificate.rejected, (state, action) => {
      const stateCopy = state;
      console.log(action.error);
    });
  },
});

export default medicalCertificateReducer.reducer;
