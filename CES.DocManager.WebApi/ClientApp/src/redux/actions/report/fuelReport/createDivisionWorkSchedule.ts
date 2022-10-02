import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IDivisionWorkScheduleRequest, ICreateDivisionWorkScheduleResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const createDivisionWorkSchedule = createAsyncThunk<ICreateDivisionWorkScheduleResponse,
IDivisionWorkScheduleRequest, { rejectValue: FetchTodosError }>(
  'createDivisionWorkSchedule',
  async (data: IDivisionWorkScheduleRequest, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_DIVISION_WORK_SCHEDULE === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.post<
      ICreateDivisionWorkScheduleResponse>(process.env.REACT_APP_DIVISION_WORK_SCHEDULE, data);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Введены неверные данные',
      });
    }
  },
);
export default createDivisionWorkSchedule;
