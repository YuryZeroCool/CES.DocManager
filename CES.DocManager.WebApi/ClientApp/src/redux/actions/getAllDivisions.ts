import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../http/loginHttp';
import { Division } from '../../types/ReportTypes';
import { FetchTodosError } from '../../types/type';

const getDivisions = createAsyncThunk<Division[], number, { rejectValue: FetchTodosError }>(
  'getDivisions',
  async (num, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DIVISIONS === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<Division[]>(`${process.env.REACT_APP_DIVISIONS}`);
      return response.data;
    } catch (err) {
      if (err instanceof Error || err instanceof AxiosError) {
        return rejectWithValue({
          message: err.message,
        });
      }
      return rejectWithValue({
        message: '',
      });
    }
  },
);

export default getDivisions;
