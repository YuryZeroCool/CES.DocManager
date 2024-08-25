import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTodosError } from '../../../../types/type';
import { Unit } from '../../../../types/ReportTypes';
import $api from '../../../../http/loginHttp';

const getUnits = createAsyncThunk<Unit[],
void, { rejectValue: FetchTodosError }>(
  'getUnitsList',
  async (_, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_UNITS_LIST === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<Unit[]>(
        process.env.REACT_APP_GET_UNITS_LIST,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Нет данных по запросу',
      });
    }
  },
);

export default getUnits;
