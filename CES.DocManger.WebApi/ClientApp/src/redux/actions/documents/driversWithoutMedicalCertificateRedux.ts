import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { INoDriverMedicalCertificate } from '../../../types/DocumentType';

const getDriversWithoutMedicalCertificate = createAsyncThunk<INoDriverMedicalCertificate[], string>(
  'getDriversWithoutMedicalCertificate',
  async (d:string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_NO_DRIVER_MEDICAL_CERTIFICATE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<INoDriverMedicalCertificate[]>(`${process.env.REACT_APP_NO_DRIVER_MEDICAL_CERTIFICATE}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export default getDriversWithoutMedicalCertificate;
