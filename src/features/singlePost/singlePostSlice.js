import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import singlePostService from "./singlePostService";
import { setSessionExpired } from "../session/sessionSlice";

const initialState = {
  post: null,
  postIsLoading: false,
  postIsError: false,
  postIsSuccess: false,
  postErrorMessage: "",
  postSuccessMessage: "",
};

export const getSinglePost = createAsyncThunk(
  "singlePost/getSinglePost",
  async (slug, thunkApi) => {
    try {
      return await singlePostService.getSinglePost(slug);
    } catch (error) {
      console.log(error);
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

export const filterPostList = createAsyncThunk(
  "singlepost/filterPostList",
  (data) => {
    return singlePostService.filterPostList(data);
  }
);

export const updatePost = createAsyncThunk(
  "singlePost/updatePost",
  async (data, thunkApi) => {
    try {
      return await singlePostService.updatePost(data);
    } catch (error) {
      console.log(error);
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

export const singlePostSlice = createSlice({
  name: "singlePost",
  initialState,
  reducers: {
    reset: (state) => {
      state.postIsLoading = false;
      state.postIsError = false;
      state.postIsSuccess = false;
      state.postErrorMessage = "";
      state.postSuccessMessage = "";
    },
    updatePostComment: (state, action) => {
      console.log(state.post);
      console.log(JSON.parse(JSON.stringify(state.post)));
      JSON.parse(JSON.stringify(state.post.comments.push(action.payload)));
    },
    removePostComment: (state, action) => {
      console.log(action);

      state.post.comments = JSON.parse(
        JSON.stringify(
          state.post.comments.filter(
            (comment) => comment._id !== action.payload
          )
        )
      );

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePost.pending, (state) => {
        state.postIsLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.post = action.payload;
        state.postIsSuccess = true;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        console.log(action);
        state.postIsLoading = false;
        state.postIsError = true;
        state.postErrorMessage = action.payload;
      })
      .addCase(filterPostList.pending, (state) => {
        state.postIsLoading = true;
      })
      .addCase(filterPostList.fulfilled, (state, action) => {
        state.postIsLoading = false;
        state.post = action.payload;
        state.postIsSuccess = true;
      })
      .addCase(filterPostList.rejected, (state, action) => {
        state.postIsLoading = false;
        state.postIsError = true;
        state.postErrorMessage = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        console.log(action);
        state.postIsSuccess = true;
        state.postSuccessMessage = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.postIsError = true;
        state.postErrorMessage = action.payload;
      });
  },
});

export const { reset, updatePostComment, removePostComment } =
  singlePostSlice.actions;

export default singlePostSlice.reducer;
