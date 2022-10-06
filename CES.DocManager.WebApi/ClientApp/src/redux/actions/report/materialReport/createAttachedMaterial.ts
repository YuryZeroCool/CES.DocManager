import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IMaterialAttachedResponse, MaterialAttached } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const createAttachedMaterial = createAsyncThunk<IMaterialAttachedResponse,
MaterialAttached, { rejectValue: FetchTodosError }>(
  'createAttachedMaterial',
  async (data: MaterialAttached, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_POST_ENSHRINED_MATERIAL === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<
      IMaterialAttachedResponse>(process.env.REACT_APP_POST_ENSHRINED_MATERIAL, data);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Введены неверные данные',
      });
    }
  },
);
export default createAttachedMaterial;
