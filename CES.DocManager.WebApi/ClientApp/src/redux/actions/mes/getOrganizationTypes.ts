import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { OrganizationType } from '../../../types/MesTypes';

const getOrganizationType = createAsyncThunk<OrganizationType[],
void, { rejectValue: FetchTodosError }>(
  'getOrganizationType',
  async (_, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ORGANIZATION_TYPE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<OrganizationType[]>(
        `${process.env.REACT_APP_GET_ORGANIZATION_TYPE}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getOrganizationType;
