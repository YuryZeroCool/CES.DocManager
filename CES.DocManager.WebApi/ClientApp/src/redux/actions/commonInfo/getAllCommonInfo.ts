import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { CommonInfo } from '../../../types/CommonInfoTypes';
import { FetchTodosError } from '../../../types/type';

const getAllCommonInfo = createAsyncThunk<CommonInfo[],
string, { rejectValue: FetchTodosError }>(
  'getAllCommonInfo',
  async (info: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ALL_COMMON_INFO === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<CommonInfo[]>(
        process.env.REACT_APP_GET_ALL_COMMON_INFO,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default getAllCommonInfo;
