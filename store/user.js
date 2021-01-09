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
      console.log(token);
    }

    try {
      const response = await axios.get("/api/auth/user", config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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

    const response = await axios
      .post("/api/auth/login", body, config)
      .then((res) => res.data)
      .catch((err) => rejectWithValue({ err }));

    return response;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
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

    try {
      const response = await axios.post("/api/auth/logout/", null, config);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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
        state.error = null;
        state.loading = "pending";
      }
    },
    [getUser.fulfilled]: (state, { payload }) => {
      if (state.loading === "pending") {
        state.user = payload;
        state.isAuthenticated = true;
        state.loading = "idle";
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
        state.error = null;
        state.loading = "pending";
      } else {
        state.error = null;
        state.loading = "fulfilled";
      }
    },
    [login.fulfilled]: (state, { payload }) => {
      if (state.loading === "pending") {
        localStorage.setItem("token", payload.token);
        state.user = payload.user;
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
        state.loading = "idle";
      }
    },
    [login.rejected]: (state, { payload }) => {
      if (state.loading === "pending") {
        localStorage.removeItem("token");
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.error = payload.error;
        state.loading = "idle";
      }
    },
    [logout.pending]: (state) => {
      if (state.loading === "idle") {
        state.error = null;
        state.loading = "pending";
      }
    },
    [logout.fulfilled]: (state) => {
      if (state.loading === "pending") {
        localStorage.removeItem("token");
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        state.loading = "idle";
      }
    },
    [logout.rejected]: (state, { payload }) => {
      if (state.loading === "pending") {
        state.error = payload.error;
        state.loading = "idle";
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
