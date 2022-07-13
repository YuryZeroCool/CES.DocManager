import { createSlice } from '@reduxjs/toolkit';
import logout from '../../actions/logoutRedux';

const initial = {
  status: 0,
};

const logoutReducer = createSlice({
  name: 'logout',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      const stateCopy = state;
      console.log('loading');
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      const stateCopy = state;
      if (typeof action.payload !== 'undefined') {
        stateCopy.status = action.payload.status;
        localStorage.clear();
      }
    });
    builder.addCase(logout.rejected, (state, action) => {
      const stateCopy = state;
      console.log(action.error);
    });
  },
});

export default logoutReducer.reducer;
