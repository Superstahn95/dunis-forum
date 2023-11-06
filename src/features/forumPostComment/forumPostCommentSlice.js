import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import forumPostCommentService from "./forumPostCommentService";
import {
  updateForumPostComment,
  removeForumPostComment,
} from "../singleForumPost/singleForumPostSlice";
import { setSessionExpired } from "../session/sessionSlice";

const initialState = {
  forumComment: null,
  forumPostCommentIsLoading: false,
  forumPostCommentIsSuccess: false,
  forumPostCommentIsError: false,
  forumPostCommentErrorMessage: "",
  forumPostCommentSuccessMessage: "",
};

export const makeForumComment = createAsyncThunk(
  "postComment/makeForumComment",
  async (data, thunkApi) => {
    // data ={ postId: post._id, text }
    try {
      const response = await forumPostCommentService.makeForumComment(data);
      //   thunkApi.dispatch(
      //     addCommentToPost({
      //       postId: data.postId,
      //       savedComment: response.savedComment,
      //     })
      //   );

      thunkApi.dispatch(updateForumPostComment(response.savedComment));
      return response.data;
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
export const deleteForumComment = createAsyncThunk(
  "postComment/deleteComment",
  async (id, thunkApi) => {
    try {
      const response = await forumPostCommentService.deleteForumComment(id);
      thunkApi.dispatch(removeForumPostComment(id));
      return response;
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

const forumPostCommentSlice = createSlice({
  name: "postComment",
  initialState,
  reducers: {
    reset: (state) => {
      state.forumPostCommentIsLoading = false;
      state.forumPostCommentIsSuccess = false;
      state.forumPostCommentIsError = false;
      state.forumPostCommentErrorMessage = "";
      state.forumPostCommentSuccessMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeForumComment.pending, (state) => {
        state.forumPostCommentIsLoading = true;
      })
      .addCase(makeForumComment.fulfilled, (state, action) => {
        state.forumPostCommentIsLoading = false;
        state.forumComment = action.payload;
        state.forumPostCommentIsSuccess = true;
        state.forumPostCommentSuccessMessage = action.payload;
      })
      .addCase(makeForumComment.rejected, (state, action) => {
        state.forumPostCommentIsLoading = false;
        state.forumPostCommentIsError = true;
        state.forumPostCommentErrorMessage = action.payload;
      })
      .addCase(deleteForumComment.pending, (state) => {
        state.forumPostCommentIsLoading = true;
      })
      .addCase(deleteForumComment.fulfilled, (state, action) => {
        state.forumPostCommentIsLoading = false;
        state.forumComment = action.payload;
        state.forumPostCommentIsSuccess = true;
        state.forumPostCommentSuccessMessage = action.payload;
      })
      .addCase(deleteForumComment.rejected, (state, action) => {
        state.forumPostCommentIsLoading = false;
        state.forumPostCommentIsError = true;
        state.forumPostCommentErrorMessage = action.payload;
      });
  },
});

export const { reset } = forumPostCommentSlice.actions;

export default forumPostCommentSlice.reducer;
