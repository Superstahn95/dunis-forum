import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postCommentService from "./postCommentService";

import {
  updatePostComment,
  removePostComment,
} from "../singlePost/singlePostSlice";

const initialState = {
  comment: null,
  postCommentIsLoading: false,
  postCommentIsSuccess: false,
  postCommentIsError: false,
  postCommentErrorMessage: "",
  postCommentSuccessMessage: "",
};

export const makeComment = createAsyncThunk(
  "postComment/makeComment",
  async (data, thunkApi) => {
    // data ={ postId: post._id, text }
    try {
      const response = await postCommentService.makeComment(data);
      //   thunkApi.dispatch(
      //     addCommentToPost({
      //       postId: data.postId,
      //       savedComment: response.savedComment,
      //     })
      //   );
      console.log(response.savedComment);
      thunkApi.dispatch(updatePostComment(response.savedComment));
      return response.data;
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
export const deleteComment = createAsyncThunk(
  "postComment/deleteComment",
  async (id, thunkApi) => {
    try {
      const response = await postCommentService.deleteComment(id);
      thunkApi.dispatch(removePostComment(id));
      return response;
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

const postCommentSlice = createSlice({
  name: "postComment",
  initialState,
  reducers: {
    reset: (state) => {
      state.postCommentIsLoading = false;
      state.postCommentIsSuccess = false;
      state.postCommentIsError = false;
      state.postCommentErrorMessage = "";
      state.postCommentSuccessMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeComment.pending, (state) => {
        state.postCommentIsLoading = true;
      })
      .addCase(makeComment.fulfilled, (state, action) => {
        console.log(action);
        state.postCommentIsLoading = false;
        state.comment = action.payload;
        state.postCommentIsSuccess = true;
        state.postCommentSuccessMessage = action.payload;
      })
      .addCase(makeComment.rejected, (state, action) => {
        state.postCommentIsLoading = false;
        state.postCommentIsError = true;
        state.postCommentErrorMessage = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.postCommentIsLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        console.log(action);
        state.postCommentIsLoading = false;
        state.comment = action.payload;
        state.postCommentIsSuccess = true;
        state.postCommentSuccessMessage = action.payload;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.postCommentIsLoading = false;
        state.postCommentIsError = true;
        state.postCommentErrorMessage = action.payload;
      });
  },
});

export const { reset } = postCommentSlice.actions;

export default postCommentSlice.reducer;
