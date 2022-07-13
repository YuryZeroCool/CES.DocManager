import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { IExpiringDocuments } from '../../../types/HomeTypes';

const getExpiringMedicalCertificate = createAsyncThunk<IExpiringDocuments[], number>(
  'exringMedicalCertificate',
  async (month: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_EXPIRING_MEDICAL_CERTIFICATE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<IExpiringDocuments[]>(`${process.env.REACT_APP_EXPIRING_MEDICAL_CERTIFICATE}?numberMonth=${month}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export default getExpiringMedicalCertificate;
