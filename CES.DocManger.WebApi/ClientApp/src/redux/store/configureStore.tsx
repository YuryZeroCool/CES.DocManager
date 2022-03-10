import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "../../redux/actions/loginRedux"

const rootReducer = combineReducers({loginSlice});
export const store = configureStore({
    reducer: {login: rootReducer}, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
});

export type RootState = ReturnType<typeof store.getState>;

export type IAuthResponseType = typeof store.dispatch;
 