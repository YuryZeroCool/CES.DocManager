import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';
import { ContractsListRes, GetContractsListReq } from 'types/mes/ContractTypes';

const getContractsList = createAsyncThunk<ContractsListRes,
GetContractsListReq, { rejectValue: FetchTodosError }>(
  'getContractsList',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_CONTRACTS_LIST === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<ContractsListRes>(
        process.env.REACT_APP_GET_CONTRACTS_LIST!,
        {
          params: {
            min: params.min,
            max: params.max,
            contractType: params.contractType,
            filter: params.filter,
            searchValue: params.searchValue,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getContractsList;
