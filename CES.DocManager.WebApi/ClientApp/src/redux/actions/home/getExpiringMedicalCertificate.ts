import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { IExpiringDocuments } from '../../../types/HomeTypes';
import { FetchTodosError } from '../../../types/type';

const getExpiringMedicalCertificate = createAsyncThunk<IExpiringDocuments[],
number, { rejectValue: FetchTodosError }>(
  'exringMedicalCertificate',
  async (month: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_EXPIRING_MEDICAL_CERTIFICATE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<IExpiringDocuments[]>(`${process.env.REACT_APP_EXPIRING_MEDICAL_CERTIFICATE}?numberMonth=${month}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по заданному периоду',
      });
    }
  },
);

export default getExpiringMedicalCertificate;
