import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import $api from '../../../http/loginHttp';
import { FetchTodosError } from '../../../types/type';
import { IAllBrandsResponse } from '../../../types/VehicleTypes';

const getAllBrands = createAsyncThunk<IAllBrandsResponse,
string, { rejectValue: FetchTodosError }>(
  'getAllBrands',
  async (accountsName: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ALL_BRANDS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IAllBrandsResponse>(process.env.REACT_APP_GET_ALL_BRANDS);
      return response.data;
    } catch (err) {
      if (err instanceof Error || err instanceof AxiosError) {
        return rejectWithValue({
          message: err.message,
        });
      }
      return rejectWithValue({
        message: 'Нет данных',
      });
    }
  },
);

export default getAllBrands;
