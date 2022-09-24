import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { IMedicalCertificateRequest, INoDriverMedicalCertificate } from '../../../types/DocumentType';
import { FetchTodosError } from '../../../types/type';

const createMedicalCertificate = createAsyncThunk<INoDriverMedicalCertificate,
IMedicalCertificateRequest, { rejectValue: FetchTodosError }>(
  'createMedicalCertificate',
  async (medical: IMedicalCertificateRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DRIVER_MEDICAL_CERTIFICATE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.post<INoDriverMedicalCertificate>(`${process.env.REACT_APP_DRIVER_MEDICAL_CERTIFICATE}`, medical);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Медицинская справка не была создана',
      });
    }
  },
);

export default createMedicalCertificate;
