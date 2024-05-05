import { createSlice } from '@reduxjs/toolkit';
import { FuelReportResponse } from '../../../types/ReportTypes';
import createDivisionWorkSchedule from '../../actions/report/fuelReport/createDivisionWorkSchedule';
import deleteDivisionWorkSchedule from '../../actions/report/fuelReport/deleteDivisionWorkSchedule';
import getAllDivisionWorkSchedules from '../../actions/report/fuelReport/getAllDivisionWorkSchedules';
import getFuelReportInfo from '../../actions/report/fuelReport/getFuelReportInfo';
import uploadFuelWorkCard from '../../actions/report/fuelReport/uploadFuelWorkCard';

const initial: FuelReportResponse = {
  deletedDivisionWorkSchedule: {
    id: 0,
  },
  createdDivisionWorkSchedule: {
    id: 0,
    dates: [],
    division: '',
  },
  allDivisionWorkSchedule: [],
  status: '',
  fuelReportInfo: [],
};

const fuelReportReducer = createSlice({
  name: 'fuelReport',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDivisionWorkSchedule.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, createdDivisionWorkSchedule: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(createDivisionWorkSchedule.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(deleteDivisionWorkSchedule.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, deletedDivisionWorkSchedule: { id: action.payload } };
      return stateCopy;
    });
    builder.addCase(deleteDivisionWorkSchedule.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getAllDivisionWorkSchedules.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allDivisionWorkSchedule: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllDivisionWorkSchedules.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(getFuelReportInfo.pending, (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, status: 'pending' };
      return stateCopy;
    });
    builder.addCase(getFuelReportInfo.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, fuelReportInfo: [...action.payload], status: 'fulfilled' };
      return stateCopy;
    });
    builder.addCase(getFuelReportInfo.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });

    builder.addCase(uploadFuelWorkCard.pending, (state) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, status: 'pending' };
      return stateCopy;
    });
    builder.addCase(uploadFuelWorkCard.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, status: 'fulfilled' };
      return stateCopy;
    });
    builder.addCase(uploadFuelWorkCard.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default fuelReportReducer.reducer;
