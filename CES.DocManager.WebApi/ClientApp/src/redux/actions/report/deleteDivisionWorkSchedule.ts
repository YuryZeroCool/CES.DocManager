import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../http/loginHttp';
import { FetchTodosError } from '../../../types/type';

const deleteDivisionWorkSchedule = createAsyncThunk<
number, number, { rejectValue: FetchTodosError }>(
  'deleteDivisionWorkSchedule',
  async (DivisionWorkScheduleId: number, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DELETE_DIVISION_WORK_SCHEDULE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.delete<number>(`${process.env.REACT_APP_DELETE_DIVISION_WORK_SCHEDULE}?IdDivision=${DivisionWorkScheduleId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Введены неверные данные',
      });
    }
  },
);

export default deleteDivisionWorkSchedule;
