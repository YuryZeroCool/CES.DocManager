import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../../../http/loginHttp';
import { IGetFuelReportInfoResponse, IPeriod } from '../../../../types/ReportTypes';
import { FetchTodosError } from '../../../../types/type';

const getFuelReportInfo = createAsyncThunk<IGetFuelReportInfoResponse[],
IPeriod, { rejectValue: FetchTodosError }>(
  'getAllUsedMaterials',
  async (period: IPeriod, { rejectWithValue }) => {
    try {
      if (process.env.REACT_APP_GET_FUEL_REPORT_INFO === undefined) {
        throw Error('Упс, что-то пошло не так...');
      }
      const response = await $api.get<IGetFuelReportInfoResponse[]>(
        `${process.env.REACT_APP_GET_FUEL_REPORT_INFO}?month=${period.month}&year=${period.year}`,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        message: 'Неверные данные',
      });
    }
  },
);

export default getFuelReportInfo;
