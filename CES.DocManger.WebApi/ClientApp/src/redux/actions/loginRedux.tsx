import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import $api from "..//..//http//loginHttp";
import { IAuthResponse } from "..//..//models//response//AuthResponse";

export interface User {
  userName: string;
  email: string;
  token: string;
  status: string;
  error: string;
}

const initial = {
  userName: " ",
  email: "",
  token: "",
  status: "",
  error: "",
} as User;

export interface IUserRequest {
  email: string;
  password: string;
}

export const login = createAsyncThunk<IAuthResponse, IUserRequest>(
  "jwt",
  async (user: IUserRequest, { rejectWithValue }) => {
    try {
      // user.email = "de24@mail.r";
      // user.password = "#Polina09062013";
      let response = await axios.post<IAuthResponse>(
        "https://localhost:5000/login",
        user,
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err)
      // const error = err as AxiosError;
      // if (error.response) {
      //   //error.message = "Incorrect login or password";
      //   return rejectWithValue(error);
      // } else {
      //   throw err;
      // }
    }
  }
);

export const Registratin = createAsyncThunk(
  "Registratin",
  async (user: IUserRequest) => {
    const response = fetch("ss"); // await $api.post<IAuthResonse[]>("/registraion", user);
    return response;
  }
);
export const logout = createAsyncThunk("jwt", async (user: IUserRequest) => {
  const response = await $api.post<IAuthResponse[]>("logout");

  return response.data;
});

export const loginSlice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "resolved";
      if (typeof action.payload !== "undefined") {
        state.token = action.payload.accessToken;
        state.email = action.payload.email;
        console.log(state.email);
      

        // document.cookie = `${encodeURIComponent("refreshToken")} = ${encodeURIComponent(
        //   action.payload.accessToken
        // )}`;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "rejected";

      console.log("EROR", state.status);
    });
  },
});

export default loginSlice.reducer;
