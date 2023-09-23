import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActDataFromFileResponse } from '../../../types/MesTypes';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';

const getActDataFromFile = createAsyncThunk<ActDataFromFileResponse,
string, { rejectValue: FetchTodosError }>(
  'getActDataFromFile',
  async (fileName: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ACT_DATA_FROM_FILE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<ActDataFromFileResponse>(
        `${process.env.REACT_APP_GET_ACT_DATA_FROM_FILE}?fileName=${fileName}`,
      );

      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default getActDataFromFile;
