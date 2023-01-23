import { createSlice } from '@reduxjs/toolkit';
import { CommonInfoResponse } from '../../../types/CommonInfoTypes';
import getAllCommonInfo from '../../actions/commonInfo/getAllCommonInfo';

const initial: CommonInfoResponse = {
  allcommonInfo: [],
};

const commonInfoReducer = createSlice({
  name: 'commonInfo',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCommonInfo.fulfilled, (state, action) => {
      let stateCopy = state;
      stateCopy = { ...stateCopy, allcommonInfo: [...action.payload] };
      return stateCopy;
    });
    builder.addCase(getAllCommonInfo.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default commonInfoReducer.reducer;
