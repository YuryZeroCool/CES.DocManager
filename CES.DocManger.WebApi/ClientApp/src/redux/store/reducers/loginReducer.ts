import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../../types/UserTypes';
import login from '../../actions/loginRedux';

const initial: UserState = {
  userName: '',
  email: '',
  token: '',
  status: '',
};

const loginReducer = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      const stateCopy = state;
      stateCopy.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const stateCopy = state;
      stateCopy.status = 'resolved';
      if (typeof action.payload !== 'undefined') {
        stateCopy.userName = action.payload.userName;
        stateCopy.email = action.payload.email;
        stateCopy.token = action.payload.accessToken;
        localStorage.setItem('token', stateCopy.token);
        localStorage.setItem('userName', stateCopy.userName);
      }
    });
    builder.addCase(login.rejected, (state) => {
      const stateCopy = state;
      stateCopy.status = 'rejected';
      stateCopy.userName = '';
      stateCopy.email = '';
      stateCopy.token = '';
    });
  },
});

export default loginReducer.reducer;
