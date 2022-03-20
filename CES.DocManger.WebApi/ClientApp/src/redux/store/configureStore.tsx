import { configureStore } from '@reduxjs/toolkit';
// import { loginSlice } from '../actions/loginRedux';
import { rootReducer } from './reducers/combineReducers';

const store = configureStore({
  reducer: { login: rootReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type IAuthResponseType = typeof store.dispatch;
export default store;
