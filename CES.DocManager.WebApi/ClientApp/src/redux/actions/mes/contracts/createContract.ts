import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from 'http/loginHttp';
import { FetchTodosError } from 'types/type';
import { CreateContractRequest, CreateContractResponse } from 'types/mes/ContractTypes';

const createContract = createAsyncThunk<CreateContractResponse,
CreateContractRequest, { rejectValue: FetchTodosError }>(
  'createContract',
  async (req, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_CREATE_CONTRACT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<CreateContractResponse>(
        process.env.REACT_APP_CREATE_CONTRACT,
        req,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Не удалось создать договор.',
      });
    }
  },
);

export default createContract;
