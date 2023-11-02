import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

//most likely the token being saved to localstorage
// const user =JSON.parse(localStorage.getItem("user"))

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isAuthenticated: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk("auth/login", async (user, thunkApi) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.log(error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkApi.rejectWithValue(message);
  }
});
export const reAuthenticate = createAsyncThunk(
  "auth/reAuthenticate",
  async (token, thunkApi) => {
    try {
      return await authService.reAuthenticate(token);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, thunkApi) => {
    try {
      return await authService.updateUser(data);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, thunkApi) => {
    try {
      return await authService.changePassword(data);
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(reAuthenticate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reAuthenticate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(reAuthenticate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.isSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isError = true;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
