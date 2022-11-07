import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { AllGroupAccountsResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllGroupAccounts = createAsyncThunk<AllGroupAccountsResponse,
string, { rejectValue: FetchTodosError }>(
  'getAllGroupAccounts',
  async (accountsName: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ALL_GROUP_ACCOUNTS === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<AllGroupAccountsResponse>(`${process.env.REACT_APP_ALL_GROUP_ACCOUNTS}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных',
      });
    }
  },
);

export default getAllGroupAccounts;
