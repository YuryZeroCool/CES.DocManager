import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';
import { NoteWithoutAct, CreateNoteRequest } from 'types/mes/NotesWithoutActTypes';

const createExistedNote = createAsyncThunk<NoteWithoutAct[],
CreateNoteRequest, { rejectValue: FetchTodosError }>(
  'createExistedNote',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_EXISTED_NOTE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<NoteWithoutAct[]>(
        process.env.REACT_APP_CREATE_EXISTED_NOTE,
        req,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Заявка не создана',
      });
    }
  },
);

export default createExistedNote;
