import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';

const markContractPrinted = createAsyncThunk<number,
number, { rejectValue: FetchTodosError }>(
  'markContractPrinted',
  async (contractId, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_MARK_CONTRACT_PRINTED === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      await $api.patch(`${process.env.REACT_APP_MARK_CONTRACT_PRINTED}/${contractId}/printed`);
      return contractId;
    } catch (err) {
      return rejectWithValue({
        message: 'Не удалось обновить статус печати договора',
      });
    }
  },
);

export default markContractPrinted;
