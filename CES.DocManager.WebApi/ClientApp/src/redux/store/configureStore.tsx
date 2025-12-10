import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers/combineReducers';
import errorNotificationMiddleware from './errorNotificationMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
    .concat(errorNotificationMiddleware),
  devTools: true,
});

export type IAuthResponseType = typeof store.dispatch;
export default store;
