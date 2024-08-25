import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { Material, MaterialRequest } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const createNewMaterial = createAsyncThunk<Material,
MaterialRequest, { rejectValue: FetchTodosError }>(
  'createNewMaterial',
  async (data: MaterialRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_MATERIAL === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<Material>(process.env.REACT_APP_CREATE_MATERIAL, data);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Введены неверные данные',
      });
    }
  },
);

export default createNewMaterial;
