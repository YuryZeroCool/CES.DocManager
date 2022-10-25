import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { FetchTodosError } from '../../../../types/type';

const getDefectiveSheet = createAsyncThunk<string, number, { rejectValue: FetchTodosError }>(
  'getDefectiveSheet',
  async (id: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_DEFECTIVE_SHEET === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<string>(`${process.env.REACT_APP_GET_DEFECTIVE_SHEET}?id=${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default getDefectiveSheet;
