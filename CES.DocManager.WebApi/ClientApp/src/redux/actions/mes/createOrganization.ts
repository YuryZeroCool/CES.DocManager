import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { Organization } from '../../../types/MesTypes';

type ErrorMessage = {
  message: string;
};

const createOrganization = createAsyncThunk<Organization,
Organization, { rejectValue: FetchTodosError }>(
  'createOrganization',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_ORGANIZATION === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<Organization>(
        process.env.REACT_APP_CREATE_ORGANIZATION,
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

export default createOrganization;
