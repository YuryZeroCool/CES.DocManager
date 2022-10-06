import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IMaterialAttachedResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllAttachedMaterials = createAsyncThunk<IMaterialAttachedResponse[],
string, { rejectValue: FetchTodosError }>(
  'getAllAttachedMaterials',
  async (accountsName: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ALL_ATTACHED_MATERIALS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IMaterialAttachedResponse[]>(
        process.env.REACT_APP_ALL_ATTACHED_MATERIALS,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default getAllAttachedMaterials;
