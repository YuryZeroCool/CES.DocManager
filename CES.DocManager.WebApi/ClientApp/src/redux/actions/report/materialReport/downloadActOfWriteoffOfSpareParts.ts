import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { FetchTodosError } from '../../../../types/type';

const downloadActOfWriteoffOfSpareParts = createAsyncThunk<ArrayBuffer, number,
{ rejectValue: FetchTodosError }>(
  'downloadActOfWriteoffOfSpareParts',
  async (period: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ACT_OF_WRITEOFF_OF_SPARES === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<ArrayBuffer>(`${process.env.REACT_APP_GET_ACT_OF_WRITEOFF_OF_SPARES}?period=${period}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default downloadActOfWriteoffOfSpareParts;
