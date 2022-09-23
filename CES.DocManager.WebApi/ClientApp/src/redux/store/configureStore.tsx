import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers/combineReducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type IAuthResponseType = typeof store.dispatch;
export default store;
