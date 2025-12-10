import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';
import { EditNoteRequest, NoteWithoutAct } from 'types/mes/NotesWithoutActTypes';

const editExistedNote = createAsyncThunk<NoteWithoutAct[],
EditNoteRequest, { rejectValue: FetchTodosError }>(
  'editExistedNote',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_EDIT_EXISTED_NOTE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.put<NoteWithoutAct[]>(
        process.env.REACT_APP_EDIT_EXISTED_NOTE,
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

export default editExistedNote;
