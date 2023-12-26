import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';

const deleteAct = createAsyncThunk<number,
number, { rejectValue: FetchTodosError }>(
  'deleteAct',
  async (id, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DELETE_ACT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.delete<number>(
        `${process.env.REACT_APP_DELETE_ACT}?id=${id}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default deleteAct;
