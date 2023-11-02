import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import forumPostService from "./forumPostService";
const initialState = {
  forumPosts: null,
  forumPostsIsLoading: false,
  forumPostsIsError: false,
  forumPostsIsSuccess: false,
  forumPostsErrorMessage: "",
  forumPostCount: 0,
};

export const getAllForumPosts = createAsyncThunk(
  "forumPost/getAllForumPosts",
  async (data, thunkApi) => {
    try {
      return await forumPostService.getAllForumPosts(data);
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
export const createForumPost = createAsyncThunk(
  "forumPost/createForumPost",
  async (data, thunkApi) => {
    console.log("we just hit the createForumSlice");
    try {
      return await forumPostService.createForumPost(data);
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

export const deleteForumPost = createAsyncThunk(
  "forumPost/deleteForumPost",
  async (id, thunkApi) => {
    try {
      const response = await forumPostService.deleteForumPost(id);
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

export const forumPostSlice = createSlice({
  name: "forumPost",
  initialState,
  reducers: {
    reset: (state) => {
      state.forumPostsIsLoading = false;
      state.forumPostsIsError = false;
      state.forumPostsIsSuccess = false;
      state.forumPostsErrorMessage = "";
      state.forumPostCount = 0;
    },

    testState: (state) => {
      console.log(JSON.parse(JSON.stringify(state.forumPosts)));
    },
    addForumPost: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllForumPosts.pending, (state) => {
        state.forumPostsIsLoading = true;
      })
      .addCase(getAllForumPosts.fulfilled, (state, action) => {
        state.forumPostsIsLoading = false;
        state.forumPosts = action.payload.forumPosts;
        state.forumPostsIsSuccess = true;
        state.forumPostCount = action.payload.postCount;
      })
      .addCase(getAllForumPosts.rejected, (state, action) => {
        console.log("forum posts failed");
        console.log(action);
        state.forumPostsIsLoading = false;
        state.forumPostsIsError = true;
        state.forumPostsErrorMessage = action.payload;
      })
      //   .addCase(createForumPost.pending, (state) => {
      //     state.forumPostsIsLoading = true;
      //   })
      .addCase(createForumPost.fulfilled, (state, action) => {
        // state.forumPostsIsLoading = false;
        JSON.parse(JSON.stringify(state.forumPosts.unshift(action.payload)));
        state.forumPostsIsSuccess = true;
      })
      .addCase(createForumPost.rejected, (state, action) => {
        state.forumPostsIsLoading = false;
        state.forumPostsIsError = true;
        state.forumPostsErrorMessage = action.payload;
      })
      .addCase(deleteForumPost.fulfilled, (state, action) => {
        console.log(action);
        // state.forumPostsIsLoading = false;
        const updatedForumPosts = JSON.parse(
          JSON.stringify(
            state.forumPosts.filter((post) => post._id != action.payload.id)
          )
        );
        state.forumPosts = updatedForumPosts;
        state.forumPostsIsSuccess = true;
      })
      .addCase(deleteForumPost.rejected, (state, action) => {
        console.log(action);
        state.forumPostsIsError = true;
        state.forumPostsErrorMessage = action.payload;
      });
  },
});

export const { reset, testState } = forumPostSlice.actions;

export default forumPostSlice.reducer;
