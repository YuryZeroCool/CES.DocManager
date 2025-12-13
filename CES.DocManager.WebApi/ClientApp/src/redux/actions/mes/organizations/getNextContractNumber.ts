import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'http/loginHttp';
import {
  GetNextContractNumberParams,
  GetNextContractNumberResponse,
} from 'types/mes/OrganizationTypes';
import { FetchTodosError } from 'types/type';

const getNextContractNumber = createAsyncThunk<GetNextContractNumberResponse,
GetNextContractNumberParams, { rejectValue: FetchTodosError }>(
  'getNextContractNumber',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_NEXT_CONTRACT_NUMBER === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<GetNextContractNumberResponse>(
        `${process.env.REACT_APP_GET_NEXT_CONTRACT_NUMBER}?
        organizationName=${params.organizationName}&date=${params.date}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getNextContractNumber;
