import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { OrganizationResponse } from '../../../types/MesTypes';

const editOrganization = createAsyncThunk<OrganizationResponse,
OrganizationResponse, { rejectValue: FetchTodosError }>(
  'editOrganization',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_EDIT_ORGANIZATION === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.put<OrganizationResponse>(
        process.env.REACT_APP_EDIT_ORGANIZATION,
        req,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Не удалось отредактировать организацию',
      });
    }
  },
);

export default editOrganization;
