import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IPeriod } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const downloadActOfWritingOffMaterials = createAsyncThunk<string, IPeriod,
{ rejectValue: FetchTodosError }>(
  'downloadActOfWritingOffMaterials',
  async (period: IPeriod, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ACT_OF_WRITEOFF_MATERIALS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<string>(`${process.env.REACT_APP_GET_ACT_OF_WRITEOFF_MATERIALS}?month=${period.month}&year=${period.year}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default downloadActOfWritingOffMaterials;
