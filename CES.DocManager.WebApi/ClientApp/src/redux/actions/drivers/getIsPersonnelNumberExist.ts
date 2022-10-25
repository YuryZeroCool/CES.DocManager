import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { FetchTodosError } from '../../../types/type';

const getIsPersonnelNumberExist = createAsyncThunk<boolean,
number, { rejectValue: FetchTodosError }>(
  'getIsPersonnelNumberExist',
  async (personnelNumber: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_IS_PERSONAL_NUMBER === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.get<boolean>(`${process.env.REACT_APP_IS_PERSONAL_NUMBER}/${personnelNumber}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Что-то пошло не так...',
      });
    }
  },
);

export default getIsPersonnelNumberExist;
