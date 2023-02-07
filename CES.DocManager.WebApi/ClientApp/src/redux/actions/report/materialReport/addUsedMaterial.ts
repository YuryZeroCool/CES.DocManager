import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IAddUsedMaterialRequest, IUsedMaterialResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const addUsedMaterial = createAsyncThunk<IUsedMaterialResponse,
IAddUsedMaterialRequest, { rejectValue: FetchTodosError }>(
  'addUsedMaterial',
  async (data: IAddUsedMaterialRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ADD_USED_MATERIAL === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<
      IUsedMaterialResponse>(process.env.REACT_APP_ADD_USED_MATERIAL, data);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Упс, что-то пошло не так...',
      });
    }
  },
);

export default addUsedMaterial;
