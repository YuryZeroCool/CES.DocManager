import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { AllMaterialsResponse, Product } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllMaterials = createAsyncThunk<AllMaterialsResponse,
string, { rejectValue: FetchTodosError }>(
  'getAllProducts',
  async (accountsName: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ALL_PRODUCTS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<Product[]>(`${process.env.REACT_APP_ALL_PRODUCTS}?accountsName=${accountsName}`);

      return {
        totalCount: response.headers['x-total-count'] ? response.headers['x-total-count'] : '',
        totalSum: response.headers['x-total-sum'] ? response.headers['x-total-sum'] : '',
        data: response.data,
      };
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default getAllMaterials;
