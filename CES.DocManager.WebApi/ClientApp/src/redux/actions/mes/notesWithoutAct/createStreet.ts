import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';
import { StreetResponse } from 'types/mes/NotesWithoutActTypes';

type ErrorMessage = {
  message: string;
};

const createStreet = createAsyncThunk<StreetResponse,
string, { rejectValue: FetchTodosError }>(
  'createStreet',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_STREET === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<StreetResponse>(
        process.env.REACT_APP_CREATE_STREET,
        req,
      );
      return response.data;
    } catch (err) {
      let message = '';
      if (axios.isAxiosError(err) && err.response) {
        const { data } = err.response;
        message = (data as ErrorMessage).message;
      }
      return rejectWithValue({
        message,
      });
    }
  },
);

export default createStreet;
