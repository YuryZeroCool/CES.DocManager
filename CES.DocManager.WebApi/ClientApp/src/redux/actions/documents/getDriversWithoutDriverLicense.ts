import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { IDriverWithoutDocuments } from '../../../types/DocumentType';
import { FetchTodosError } from '../../../types/type';

const getDriversWithoutDriverLicense = createAsyncThunk<IDriverWithoutDocuments[],
string, { rejectValue: FetchTodosError }>(
  'getDriversWithoutDriverLicense',
  async (d:string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_NO_DRIVER_LICENSE === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<IDriverWithoutDocuments[]>(`${process.env.REACT_APP_NO_DRIVER_LICENSE}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по данному запросу',
      });
    }
  },
);

export default getDriversWithoutDriverLicense;
