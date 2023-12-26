import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../types/type';
import $api from '../../../http/loginHttp';
import { ActsListRes, GetActsListReq } from '../../../types/MesTypes';

const getActsList = createAsyncThunk<ActsListRes,
GetActsListReq, { rejectValue: FetchTodosError }>(
  'getActsList',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_ACTS_LIST === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<ActsListRes>(
        `${process.env.REACT_APP_GET_ACTS_LIST}?min=${params.min}&max=${params.max}&page=${params.page}&limit=${params.limit}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getActsList;
