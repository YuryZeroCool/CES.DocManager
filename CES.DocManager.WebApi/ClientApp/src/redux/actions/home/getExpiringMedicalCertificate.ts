import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { IExpiringDocumentsResponse } from '../../../types/DocumentType';
import { FetchTodosError } from '../../../types/type';

const getExpiringMedicalCertificate = createAsyncThunk<IExpiringDocumentsResponse[],
number, { rejectValue: FetchTodosError }>(
  'exringMedicalCertificate',
  async (month: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_EXPIRING_MEDICAL_CERTIFICATE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<IExpiringDocumentsResponse[]>(`${process.env.REACT_APP_EXPIRING_MEDICAL_CERTIFICATE}?numberMonth=${month}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по заданному периоду',
      });
    }
  },
);

export default getExpiringMedicalCertificate;
