import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import $api from '../../http/loginHttp';
import { IAuthResponse, IUserRequest } from '../../types/UserTypes';

const login = createAsyncThunk<IAuthResponse, IUserRequest>(
  'jwt',
  async (user: IUserRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post<IAuthResponse>(
        'https://localhost:5001/login',
        user,
        {
          method: 'post',
          headers: {
            accept: 'text/plain',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

// export const Registration = createAsyncThunk(
//   "Registration",
//   async (user: IUserRequest) => {
//     const response = fetch("ss"); // await $api.post<IAuthResonse[]>("/registration", user);
//     return response;
//   }
// );

export const logout = createAsyncThunk('jwt', async (user: IUserRequest) => {
  const response = await $api.post<IAuthResponse[]>('logout');

  return response.data;
});

export default login;
