import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActTypesFromFileResponse } from '../../../types/MesTypes';
import $api from '../../../http/loginHttp';
import { FetchTodosError } from '../../../types/type';

const getActTypesFromFile = createAsyncThunk<ActTypesFromFileResponse[],
void, { rejectValue: FetchTodosError }>(
  'getActTypesFromFile',
  async (_, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ACT_TYPES_FROM_FILE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<ActTypesFromFileResponse[]>(
        process.env.REACT_APP_GET_ACT_TYPES_FROM_FILE,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getActTypesFromFile;
