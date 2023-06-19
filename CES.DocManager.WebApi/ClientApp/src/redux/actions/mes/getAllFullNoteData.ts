import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { IFullNoteData } from '../../../types/MesTypes';

const getAllFullNoteData = createAsyncThunk<IFullNoteData[],
void, { rejectValue: FetchTodosError }>(
  'getFullNoteData',
  async (_, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ALL_FULL_NOTE_DATA === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IFullNoteData[]>(
        process.env.REACT_APP_GET_ALL_FULL_NOTE_DATA,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getAllFullNoteData;
