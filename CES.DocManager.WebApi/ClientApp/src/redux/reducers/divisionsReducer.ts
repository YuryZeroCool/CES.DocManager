import { createSlice } from '@reduxjs/toolkit';
import { Division } from '../../types/ReportTypes';
import getDivisions from '../actions/getAllDivisions';

const initial: Division[] = [];

const divisionsReducer = createSlice({
  name: 'divisions',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDivisions.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = action.payload;
      return stateCopy;
    });
    builder.addCase(getDivisions.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default divisionsReducer.reducer;
