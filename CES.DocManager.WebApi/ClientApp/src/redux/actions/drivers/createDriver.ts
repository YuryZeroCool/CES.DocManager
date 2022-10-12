import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { ICreateDriverRequest, ICreateDriverResponse } from '../../../types/DriversType';
import { FetchTodosError } from '../../../types/type';

const createDriver = createAsyncThunk<ICreateDriverResponse,
ICreateDriverRequest, { rejectValue: FetchTodosError }>(
  'createDriver',
  async (driver: ICreateDriverRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_DRIVER === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.post<ICreateDriverResponse>(`${process.env.REACT_APP_CREATE_DRIVER}`, driver);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Медицинская справка не была создана',
      });
    }
  },
);

export default createDriver;
