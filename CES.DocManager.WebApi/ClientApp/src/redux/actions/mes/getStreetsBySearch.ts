import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';

const getStreetsBySearch = createAsyncThunk<string[],
string, { rejectValue: FetchTodosError }>(
  'getStreetsBySearch',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_STREETS_BY_SEARCH === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<string[]>(
        `${process.env.REACT_APP_STREETS_BY_SEARCH}?value=${params}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getStreetsBySearch;
