import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IAllDivisionWorkSchedulesResponse } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getAllDivisionWorkSchedules = createAsyncThunk<IAllDivisionWorkSchedulesResponse,
string, { rejectValue: FetchTodosError }>(
  'getAllDivisionWorkSchedules',
  async (date: string, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_ALL_DIVISION_WORK_SCHEDULES === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IAllDivisionWorkSchedulesResponse>(`${process.env.REACT_APP_ALL_DIVISION_WORK_SCHEDULES}?period=${date}`);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по заданному периоду',
      });
    }
  },
);

export default getAllDivisionWorkSchedules;
