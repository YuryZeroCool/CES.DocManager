import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { EditNoteRequest } from '../../../types/MesTypes';

const createNewNote = createAsyncThunk<number,
EditNoteRequest, { rejectValue: FetchTodosError }>(
  'createNewNote',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_NEW_NOTE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<number>(
        process.env.REACT_APP_CREATE_NEW_NOTE,
        req,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default createNewNote;
