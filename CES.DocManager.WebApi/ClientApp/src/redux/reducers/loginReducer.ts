import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from 'types/UserTypes';
import login from 'redux/actions/login';

const initial: UserState = {
  userName: localStorage.getItem('userName') ?? '',
  email: localStorage.getItem('email') ?? '',
  accessToken: localStorage.getItem('accessToken') ?? '',
  role: localStorage.getItem('role') ?? '',
  status: '',
};

const loginReducer = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    clearUserState: () => initial,
    setUserName: (state, action: PayloadAction<string>) => {
      const stateCopy = state;
      stateCopy.userName = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      const stateCopy = state;
      stateCopy.accessToken = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      const stateCopy = state;
      stateCopy.email = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      const stateCopy = state;
      stateCopy.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      const stateCopy = state;
      stateCopy.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      let stateCopy: UserState = state;
      stateCopy.status = 'resolved';
      if (typeof action.payload !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('email', action.payload.email);
        localStorage.setItem('userName', action.payload.userName);
        localStorage.setItem('role', (action.payload.role ?? '').toLowerCase());
        stateCopy = Object.assign(state, action.payload);
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      let stateCopy: UserState = state;
      stateCopy = Object.assign(state, initial);
      stateCopy.status = 'rejected';
      throw Error(action.payload?.message);
    });
  },
});

export const {
  clearUserState,
  setUserName,
  setToken,
  setEmail,
  setRole,
} = loginReducer.actions;
export default loginReducer.reducer;
