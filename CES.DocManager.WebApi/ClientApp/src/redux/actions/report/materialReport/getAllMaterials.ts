import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { AllMaterialsResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllMaterials = createAsyncThunk<AllMaterialsResponse,
string, { rejectValue: FetchTodosError }>(
  'getAllProducts',
  async (accountsName: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ALL_PRODUCTS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<AllMaterialsResponse>(`${process.env.REACT_APP_ALL_PRODUCTS}?accountsName=${accountsName}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'По этому счету нет материалов',
      });
    }
  },
);

export default getAllMaterials;
