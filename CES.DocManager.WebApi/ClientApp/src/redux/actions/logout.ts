import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../http/loginHttp';
import { FetchTodosError } from '../../types/type';

const logout = createAsyncThunk<number, string, { rejectValue: FetchTodosError }>(
  'logout',
  async (email: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_LOGOUT === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.post<number>(
        process.env.REACT_APP_LOGOUT,
        email,
      );

      return response.status;
    } catch (err) {
      return rejectWithValue({
        message: 'Что-то пошло не так',
      });
    }
  },
);

export default logout;
