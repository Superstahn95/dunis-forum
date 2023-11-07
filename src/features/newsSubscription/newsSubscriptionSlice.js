import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsSubscriptionService from "./newsSubscriptionService";
import { setSessionExpired } from "../session/sessionSlice";

const initialState = {
  subscribers: null,
  subscriberIsSuccess: false,
  subscriberIsError: false,
  subscriberErrorMessage: "",
  subscriberSuccessMessage: "",
  subscriberIsLoading: false,
};

export const createSubscriber = createAsyncThunk(
  "newsSubscriber/createSubscriber",
  async (data, thunkApi) => {
    try {
      return await newsSubscriptionService.createSubscriber(data);
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

export const deleteSubscriber = createAsyncThunk(
  "newsSubscriber/deletePost",
  async (id, thunkApi) => {
    try {
      const response = await newsSubscriptionService.deleteSubscriber(id);
      return { response, id };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (message === "Session expired") {
        thunkApi.dispatch(setSessionExpired(true));
      } else {
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const getAllSubscribers = createAsyncThunk(
  "newsSubscriber/getAllSubscribers",
  async (_, thunkApi) => {
    try {
      return await newsSubscriptionService.getSubscribers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      if (message === "Session expired") {
        thunkApi.dispatch(setSessionExpired(true));
      } else {
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const newsSubscriberSlice = createSlice({
  name: "newsSubscriber",
  initialState,
  reducers: {
    reset: (state) => {
      // state.subscriberIsLoading = false;
      state.subscriberIsError = false;
      state.subscriberIsSuccess = false;
      state.subscriberErrorMessage = "";
      state.subscriberSuccessMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllSubscribers.pending, (state) => {
        state.subscriberIsLoading = true;
      })
      .addCase(getAllSubscribers.fulfilled, (state, action) => {
        state.subscriberIsLoading = false;
        state.subscribers = action.payload.subscribers;
        // state.subscriberIsSuccess = true;
      })
      .addCase(getAllSubscribers.rejected, (state, action) => {
        state.subscriberIsLoading = false;
        state.subscriberIsError = true;
        state.subscriberErrorMessage = action.payload;
      })
      .addCase(deleteSubscriber.fulfilled, (state, action) => {
        // state.postsIsSuccess = true;
        const updatedSubscribers = JSON.parse(
          JSON.stringify(state.subscribers)
        ).filter((subscriber) => subscriber._id !== action.payload.id);
        state.subscribers = updatedSubscribers;
      })
      .addCase(deleteSubscriber.rejected, (state, action) => {
        state.subscriberIsError = true;
        state.subscriberErrorMessage = action.payload;
      })
      .addCase(createSubscriber.fulfilled, (state, action) => {
        state.subscriberIsSuccess = true;
        state.subscriberSuccessMessage = action.payload;
      })
      .addCase(createSubscriber.rejected, (state, action) => {
        state.subscriberIsError = true;
        state.subscriberErrorMessage = action.payload;
      });
  },
});

export const { reset } = newsSubscriberSlice.actions;

export default newsSubscriberSlice.reducer;
