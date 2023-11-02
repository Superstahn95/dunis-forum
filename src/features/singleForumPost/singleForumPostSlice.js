import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import singleForumPostService from "./singleForumPostService";
const initialState = {
  forumPost: null,
  forumPostIsLoading: false,
  forumPostIsError: false,
  forumPostIsSuccess: false,
  forumPostErrorMessage: "",
};

export const getSingleForumPost = createAsyncThunk(
  "singlePost/getSingleForumPost",
  async (id, thunkApi) => {
    try {
      return await singleForumPostService.getSingleForumPost(id);
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

export const filterForumPost = createAsyncThunk(
  "singlepost/filterForumPost",
  (data) => {
    return singleForumPostService.filterForumPosts(data);
  }
);

export const singleForumPostSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {
    reset: (state) => {
      state.forumPostIsLoading = false;
      state.forumPostIsError = false;
      state.forumPostIsSuccess = false;
      state.forumPostErrorMessage = "";
    },
    updateForumPostComment: (state, action) => {
      console.log("we are pushing this into the array");
      JSON.parse(
        JSON.stringify(state.forumPost.forumComments.unshift(action.payload))
      );
      console.log(JSON.parse(JSON.stringify(state.forumPost)));
    },
    removeForumPostComment: (state, action) => {
      console.log(action);

      state.forumPost.comments = JSON.parse(
        JSON.stringify(
          state.forumPost.forumComments.filter(
            (comment) => comment._id !== action.payload
          )
        )
      );

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleForumPost.pending, (state) => {
        state.forumPostIsLoading = true;
      })
      .addCase(getSingleForumPost.fulfilled, (state, action) => {
        state.forumPostIsLoading = false;
        state.forumPost = action.payload;
        state.forumPostIsSuccess = true;
      })
      .addCase(getSingleForumPost.rejected, (state, action) => {
        state.forumPostIsLoading = false;
        state.forumPostIsError = true;
        state.forumPostErrorMessage = action.payload;
      })
      .addCase(filterForumPost.pending, (state) => {
        state.forumPostIsLoading = true;
      })
      .addCase(filterForumPost.fulfilled, (state, action) => {
        state.forumPostIsLoading = false;
        state.forumPost = action.payload;
        state.forumPostIsSuccess = true;
      })
      .addCase(filterForumPost.rejected, (state, action) => {
        state.forumPostIsLoading = false;
        state.forumPostIsError = true;
        state.forumPostErrorMessage = action.payload;
      });
  },
});

export const { reset, updateForumPostComment, removeForumPostComment } =
  singleForumPostSlice.actions;

export default singleForumPostSlice.reducer;
