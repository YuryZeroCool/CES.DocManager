import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import { ISearchOrganization, SearchOrganization } from '../../../types/MesTypes';
import $api from '../../../http/loginHttp';

const searchOrganizations = createAsyncThunk<ISearchOrganization,
SearchOrganization, { rejectValue: FetchTodosError }>(
  'searchOrganizations',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ORGANIZATIONS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<ISearchOrganization>(
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
