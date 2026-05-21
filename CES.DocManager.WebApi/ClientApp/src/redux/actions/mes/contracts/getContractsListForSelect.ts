import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';
import { GetContractsListForSelectReq, GetContractsListForSelectRes } from 'types/mes/ContractTypes';

const getContractsListForSelect = createAsyncThunk<GetContractsListForSelectRes,
GetContractsListForSelectReq, { rejectValue: FetchTodosError }>(
  'getContractsListForSelect',
  async (params, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_CONTRACTS_LIST_FOR_SELECT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const query = new URLSearchParams({
        organizationName: params.organizationName,
        date: params.date,
      });

      if (params.street) {
        query.set('street', params.street);
      }

      if (params.houseNumber) {
        query.set('houseNumber', params.houseNumber);
      }

      const response = await $api.get<GetContractsListForSelectRes>(
        `${process.env.REACT_APP_GET_CONTRACTS_LIST_FOR_SELECT}?${query.toString()}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getContractsListForSelect;
