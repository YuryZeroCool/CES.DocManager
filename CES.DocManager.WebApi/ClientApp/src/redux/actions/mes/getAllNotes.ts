import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { INote } from '../../../types/MesTypes';

const getAllNotes = createAsyncThunk<INote[], void, { rejectValue: FetchTodosError }>(
  'getNotes',
  async (_, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ALL_NOTES === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<INote[]>(process.env.REACT_APP_GET_ALL_NOTES);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getAllNotes;
