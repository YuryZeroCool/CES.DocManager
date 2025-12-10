import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';

const deleteOrganization = createAsyncThunk<number,
number, { rejectValue: FetchTodosError }>(
  'deleteOrganization',
  async (id, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DELETE_ORGANIZATION === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.delete<number>(
        `${process.env.REACT_APP_DELETE_ORGANIZATION}?id=${id}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default deleteOrganization;
