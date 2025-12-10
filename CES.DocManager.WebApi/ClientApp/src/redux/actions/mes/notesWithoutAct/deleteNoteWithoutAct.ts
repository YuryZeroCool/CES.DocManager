import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';

const deleteNoteWithoutAct = createAsyncThunk<number,
number, { rejectValue: FetchTodosError }>(
  'deleteNoteWithoutAct',
  async (id, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DELETE_NOTE_WITHOUT_ACT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.delete<number>(
        `${process.env.REACT_APP_DELETE_NOTE_WITHOUT_ACT}?id=${id}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Произошла ошибка во время удаления заявки',
      });
    }
  },
);

export default deleteNoteWithoutAct;
