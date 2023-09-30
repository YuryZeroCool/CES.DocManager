import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';

const deleteNote = createAsyncThunk<number,
number, { rejectValue: FetchTodosError }>(
  'deleteNote',
  async (id, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DELETE_NOTE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.delete<number>(
        `${process.env.REACT_APP_DELETE_NOTE}?id=${id}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default deleteNote;
