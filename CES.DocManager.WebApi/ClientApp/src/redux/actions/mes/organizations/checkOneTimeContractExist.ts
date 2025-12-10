import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'http/loginHttp';
import {
  CheckOneTimeContractExistParams,
  CheckOneTimeContractExistResponse,
} from 'types/mes/OrganizationTypes';
import { FetchTodosError } from 'types/type';

const checkOneTimeContractExist = createAsyncThunk<CheckOneTimeContractExistResponse,
CheckOneTimeContractExistParams, { rejectValue: FetchTodosError }>(
  'checkOneTimeContractExist',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CHECK_ONE_TIME_CONTRACT_EXIST === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<CheckOneTimeContractExistResponse>(
        `${process.env.REACT_APP_CHECK_ONE_TIME_CONTRACT_EXIST}?
        organizationName=${params.organizationName}&date=${params.date}&noteIds=${params.noteIds}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default checkOneTimeContractExist;
