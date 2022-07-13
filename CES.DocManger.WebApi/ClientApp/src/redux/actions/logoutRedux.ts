import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../http/loginHttp';

const logout = createAsyncThunk('logout', async (email: string, { rejectWithValue }) => {
  try {
    const response = await $api.post('account/logout', email);
    return response;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export default logout;
