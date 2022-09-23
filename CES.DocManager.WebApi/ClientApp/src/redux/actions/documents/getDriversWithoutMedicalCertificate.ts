import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { INoDriverMedicalCertificate } from '../../../types/DocumentType';
import { FetchTodosError } from '../../../types/type';

const getDriversWithoutMedicalCertificate = createAsyncThunk<INoDriverMedicalCertificate[],
string, { rejectValue: FetchTodosError }>(
  'getDriversWithoutMedicalCertificate',
  async (d:string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_NO_DRIVER_MEDICAL_CERTIFICATE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<INoDriverMedicalCertificate[]>(`${process.env.REACT_APP_NO_DRIVER_MEDICAL_CERTIFICATE}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по данному запросу',
      });
    }
  },
);

export default getDriversWithoutMedicalCertificate;
