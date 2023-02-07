import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IPeriod, IUsedMaterialResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllUsedMaterials = createAsyncThunk<IUsedMaterialResponse[],
IPeriod, { rejectValue: FetchTodosError }>(
  'getAllUsedMaterials',
  async (period: IPeriod, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ALL_USED_MATERIALS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IUsedMaterialResponse[]>(
        `${process.env.REACT_APP_GET_ALL_USED_MATERIALS}?month=${period.month}&year=${period.year}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default getAllUsedMaterials;
