import { createSlice } from '@reduxjs/toolkit';
import { DivisionWorkScheduleResponse } from '../../../types/ReportTypes';
import createDivisionWorkSchedule from '../../actions/report/createDivisionWorkSchedule';
import deleteDivisionWorkSchedule from '../../actions/report/deleteDivisionWorkSchedule';
import getAllDivisionWorkSchedules from '../../actions/report/getAllDivisionWorkSchedules';

const initial: DivisionWorkScheduleResponse = {
  delete: {
    id: 0,
  },
  create: {
    id: 0,
    dates: [],
    division: '',
  },
  getAll: [],
};

const divisionWorkScheduleReducer = createSlice({
  name: 'divisionWorkSchedule',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDivisionWorkSchedule.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, create: { ...action.payload } };
      return stateCopy;
    });
    builder.addCase(createDivisionWorkSchedule.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
    builder.addCase(deleteDivisionWorkSchedule.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, delete: { id: action.payload } };
      return stateCopy;
    });
    builder.addCase(deleteDivisionWorkSchedule.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
    builder.addCase(getAllDivisionWorkSchedules.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, getAll: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllDivisionWorkSchedules.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default divisionWorkScheduleReducer.reducer;
