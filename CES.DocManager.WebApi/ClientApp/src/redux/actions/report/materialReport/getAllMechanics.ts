import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { AllMechanicsResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllMechanics = createAsyncThunk<AllMechanicsResponse[],
string, { rejectValue: FetchTodosError }>(
  'getAllMechanics',
  async (str: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ALL_MECHANICS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<AllMechanicsResponse[]>(
        process.env.REACT_APP_GET_ALL_MECHANICS,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default getAllMechanics;
