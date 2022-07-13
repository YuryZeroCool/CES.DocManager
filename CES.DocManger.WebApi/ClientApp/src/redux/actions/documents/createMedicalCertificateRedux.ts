import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { IMedicalCertificate, IMedicalCertificateRequest, INoDriverMedicalCertificate } from '../../../types/DocumentType';

const createMedicalCertificate = createAsyncThunk<INoDriverMedicalCertificate,
IMedicalCertificateRequest>(
  'createMedicalCertificate',
  async (medical: IMedicalCertificateRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DRIVER_MEDICAL_CERTIFICATE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.post<INoDriverMedicalCertificate>(`${process.env.REACT_APP_DRIVER_MEDICAL_CERTIFICATE}`, medical);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export default createMedicalCertificate;
