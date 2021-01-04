import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (token, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    const response = axios
      .get("/api/auth/user", config)
      .then((res) => res.data)
      .catch((err) => rejectWithValue({ err }));

    return response;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });

    const response = axios
      .post("/api/auth/login", body, config)
      .then((res) => res.data)
      .catch((err) => rejectWithValue({ err }));

    return response;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getUser.pending]: (state) => {
      if (state.loading === "idle") {
        state.user = null;
        state.loading = "pending";
        state.error = null;
      }
    },
    [getUser.fulfilled]: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.user = payload.user;
        state.loading = "fulfilled";
      }
    },
    [getUser.rejected]: (state, { payload }) => {
      if (state.loading === "pending") {
        state.user = null;
        state.error = payload.error;
        state.loading = "idle";
      }
    },
    [login.pending]: (state) => {
      if (state.loading === "idle" && !state.isAuthenticated) {
        state.user = null;
        state.loading = "pending";
        state.error = null;
      } else {
        state.loading = "fulfilled";
        state.error = null;
      }
    },
    [login.fulfilled]: (state, { payload }) => {
      if (state.loading === "pending") {
        console.log(payload);
        localStorage.setItem("token", payload.token);

        state.loading = "idle";
        state.user = payload.user;
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
        state.loading = "fulfilled";
      }
    },
    [login.rejected]: (state, { payload }) => {
      if (state.loading === "pending") {
        state.user = null;
        state.error = payload.error;
        state.isAuthenticated = false;
        state.loading = "idle";
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
