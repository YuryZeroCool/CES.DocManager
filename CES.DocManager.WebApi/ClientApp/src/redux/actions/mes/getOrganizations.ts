import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { OrganizationResponse } from '../../../types/MesTypes';

const getOrganizations = createAsyncThunk<OrganizationResponse[],
void, { rejectValue: FetchTodosError }>(
  'getOrganizations',
  async (_, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ORGANIZATIONS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<OrganizationResponse[]>(
        process.env.REACT_APP_GET_ORGANIZATIONS,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getOrganizations;
