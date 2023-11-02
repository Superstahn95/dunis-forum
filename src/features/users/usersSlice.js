import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";
const initialState = {
  users: null,
  usersIsLoading: false,
  usersIsError: false,
  usersIsSuccess: false,
  usersErrorMessage: "",
  usersSuccessMessage: "",
};

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkApi) => {
    try {
      return await usersService.getAllUsers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkApi.rejectWithValue(message);
    }
  }
);

export const authorizeUser = createAsyncThunk(
  "users/authorizeUser",
  async (id, thunkApi) => {
    try {
      const response = await usersService.authorizeUser(id);
      return { response, id };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkApi.rejectWithValue(message);
    }
  }
);

export const revokeUser = createAsyncThunk(
  "users/revokeUser",
  async (id, thunkApi) => {
    console.log("in the revoke asyncThunk action");
    try {
      const response = await usersService.revokeUser(id);
      return { response, id };
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
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkApi) => {
    try {
      const response = await usersService.deleteUser(id);
      return { response, id };
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
export const createUser = createAsyncThunk(
  "users/createUser",
  async (data, thunkApi) => {
    try {
      return await usersService.createUser(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => {
      state.usersIsLoading = false;
      state.usersIsError = false;
      state.usersIsSuccess = false;
      state.usersErrorMessage = "";
      state.usersSuccessMessage = "";
    },
    changeAuthorization: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.usersIsLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.usersIsLoading = false;
        state.users = action.payload;
        state.usersIsSuccess = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.usersIsLoading = false;
        state.usersIsError = true;
        state.usersErrorMessage = action.payload;
      })
      .addCase(authorizeUser.fulfilled, (state, action) => {
        console.log(action);
        state.users = JSON.parse(
          JSON.stringify(
            state.users.map((user) =>
              user._id == action.payload.id
                ? { ...user, authorized: true }
                : user
            )
          )
        );
        state.usersSuccessMessage = action.payload.response;
      })
      .addCase(revokeUser.fulfilled, (state, action) => {
        console.log(action);
        state.users = JSON.parse(
          JSON.stringify(
            state.users.map((user) =>
              user._id == action.payload.id
                ? { ...user, authorized: false }
                : user
            )
          )
        );
        state.usersSuccessMessage = action.payload.response;
      })
      .addCase(revokeUser.rejected, (state, action) => {
        state.usersIsError = true;
        state.usersErrorMessage = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = JSON.parse(
          JSON.stringify(
            state.users.filter((user) => user._id != action.payload.id)
          )
        );
        state.usersSuccessMessage = action.payload.response;
      })
      .addCase(createUser.pending, (state) => {
        state.usersIsLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log(action);
        state.usersIsLoading = false;
        state.usersIsSuccess = true;
        state.usersSuccessMessage = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        console.log(action);
        state.usersIsLoading = false;
        state.usersErrorMessage = action.payload;
        state.usersIsError = true;
      });
  },
});

//try fixing error messages for my async actions

export const { reset } = usersSlice.actions;

export default usersSlice.reducer;
