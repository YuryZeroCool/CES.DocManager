import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from 'types/type';
import $api from 'http/loginHttp';

const deleteContract = createAsyncThunk<number,
number, { rejectValue: FetchTodosError }>(
  'deleteContract',
  async (id, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DELETE_CONTRACT === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.delete<number>(
        `${process.env.REACT_APP_DELETE_CONTRACT}/${id}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Не удалось удалить договор.',
      });
    }
  },
);

export default deleteContract;
