import { createSlice } from '@reduxjs/toolkit';
import logout from '../actions/logout';

const initial = {
  status: 0,
};

const logoutReducer = createSlice({
  name: 'logout',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state, action) => {
      const stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        stateCopy.status = action.payload;
      }
    });
  },
});

export default logoutReducer.reducer;
