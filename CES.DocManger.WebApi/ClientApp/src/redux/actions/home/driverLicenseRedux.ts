import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { IExpiringDocuments } from '../../../types/HomeTypes';

const getExpiringDriverLicense = createAsyncThunk<IExpiringDocuments[], number>(
  'exringDriverLicense',
  async (month: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_EXPIRING_DRIVER_LICENSE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<IExpiringDocuments[]>(`${process.env.REACT_APP_EXPIRING_DRIVER_LICENSE}?numberMonth=${month}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
export default getExpiringDriverLicense;
