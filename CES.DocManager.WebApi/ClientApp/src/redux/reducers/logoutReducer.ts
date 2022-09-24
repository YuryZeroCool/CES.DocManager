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
        localStorage.clear();
      }
    });
    builder.addCase(logout.rejected, (state, action) => {
      throw Error(action.payload?.message);
    });
  },
});

export default logoutReducer.reducer;
