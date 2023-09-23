import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { IFullNoteData } from '../../../types/MesTypes';

const getNotesWithoutActs = createAsyncThunk<IFullNoteData[],
void, { rejectValue: FetchTodosError }>(
  'getNotesWithoutActs',
  async (_, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_NOTES_WITHOUT_ACTS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IFullNoteData[]>(
        process.env.REACT_APP_GET_NOTES_WITHOUT_ACTS,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getNotesWithoutActs;
