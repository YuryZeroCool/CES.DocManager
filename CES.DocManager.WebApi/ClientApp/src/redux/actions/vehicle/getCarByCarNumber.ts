import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';

const getCarByCarNumber = createAsyncThunk<string[],
string, { rejectValue: FetchTodosError }>(
  'getCarByCarNumber',
  async (carNumber, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_CAR_BY_CAR_NUMBER === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<string[]>(
        `${process.env.REACT_APP_GET_CAR_BY_CAR_NUMBER}?carNumber=${carNumber}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getCarByCarNumber;
