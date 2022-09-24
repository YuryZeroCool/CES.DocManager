import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../http/loginHttp';
import { FetchTodosError } from '../../types/type';
import { IAuthResponse, IUserRequest } from '../../types/UserTypes';

const login = createAsyncThunk<IAuthResponse, IUserRequest, { rejectValue: FetchTodosError }>(
  'login',
  async (user: IUserRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_LOGIN === undefined) {
        throw Error('Error Server');
      }
      const response = await $api.post<IAuthResponse>(
        process.env.REACT_APP_LOGIN,
        user,
      );

      if (response.status >= 500) {
        throw Error('Что-то пошло не так...');
      }

      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Пользователь с такой электронной почтой или паролем не существует',
      });
    }
  },
);

export default login;
