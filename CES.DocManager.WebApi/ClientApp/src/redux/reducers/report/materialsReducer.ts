import { createSlice } from '@reduxjs/toolkit';
import { IMaterialsResponse } from '../../../types/ReportTypes';
import getAllMaterials from '../../actions/report/materialReport/getAllMaterials';

const initial: IMaterialsResponse = {
  getAll: [],
};

const materialsReducer = createSlice({
  name: 'materials',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMaterials.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, getAll: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllMaterials.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default materialsReducer.reducer;
