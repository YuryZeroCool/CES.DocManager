import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';

const getDriversByCarNumber = createAsyncThunk<string[],
string, { rejectValue: FetchTodosError }>(
  'getDriversByCarNumber',
  async (carNumber, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_EMPLOYEE_BY_CAR_NUMBER === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<string[]>(
        `${process.env.REACT_APP_GET_EMPLOYEE_BY_CAR_NUMBER}?carNumber=${carNumber}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getDriversByCarNumber;
