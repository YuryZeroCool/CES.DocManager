import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';

const organizationsBySearch = createAsyncThunk<string[],
string, { rejectValue: FetchTodosError }>(
  'organizationsBySearch',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ORGANIZATION_BY_SEARCH === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<string[]>(
        `${process.env.REACT_APP_ORGANIZATION_BY_SEARCH}?title=${params}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default organizationsBySearch;
