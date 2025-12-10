import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';
import { OrganizationList, SearchOrganizationParams } from 'types/mes/OrganizationTypes';

const searchOrganizations = createAsyncThunk<OrganizationList,
SearchOrganizationParams, { rejectValue: FetchTodosError }>(
  'searchOrganizations',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ORGANIZATIONS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<OrganizationList>(
        `${process.env.REACT_APP_GET_ORGANIZATIONS}?title=${params.title}&limit=${params.limit}&page=${params.page}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default searchOrganizations;
