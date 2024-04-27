import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { CreateNoteRequest } from '../../../types/MesTypes';

const createExistedNote = createAsyncThunk<string,
CreateNoteRequest, { rejectValue: FetchTodosError }>(
  'createExistedNote',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_EXISTED_NOTE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<string>(
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
