import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { AllMaterialsResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllMaterials = createAsyncThunk<AllMaterialsResponse,
string, { rejectValue: FetchTodosError }>(
  'getAllProducts',
  async (accountName: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ALL_PRODUCTS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<AllMaterialsResponse>(`${process.env.REACT_APP_ALL_PRODUCTS}?accountName=${accountName}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по заданному периоду',
      });
    }
  },
);

export default getAllMaterials;
