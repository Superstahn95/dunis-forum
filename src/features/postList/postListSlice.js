import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postListService from "./postListService";
const initialState = {
  posts: null,
  postsIsLoading: false,
  postsIsError: false,
  postsIsSuccess: false,
  postsSuccessMessage: "",
  postsErrorMessage: "",
  postCount: 0,
};

export const getAllPosts = createAsyncThunk(
  "postList/getAllPosts",
  async (data, thunkApi) => {
    try {
      return await postListService.getAllPosts(data);
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

export const createPost = createAsyncThunk(
  "postList/createPost",
  async (data, thunkApi) => {
    try {
      return await postListService.createPost(data);
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

export const deletePost = createAsyncThunk(
  "postList/deletePost",
  async (id, thunkApi) => {
    try {
      const response = await postListService.deletePost(id);
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

export const postListSlice = createSlice({
  name: "postList",
  initialState,
  reducers: {
    reset: (state) => {
      state.postsIsLoading = false;
      state.postsIsError = false;
      state.postsIsSuccess = false;
      state.postsErrorMessage = "";
      state.postCount = 0;
      state.postsSuccessMessage = "";
    },
    addCommentToPost: (state, action) => {
      console.log(action.payload);

      const { postId, savedComment } = action.payload;
      const updatedPosts = JSON.parse(JSON.stringify(state.posts)).map(
        (post) => {
          console.log(post);
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, savedComment],
            };
          }
          return post;
        }
      );
      console.log(updatedPosts);
      state.posts = updatedPosts;
    },
    testState: (state) => {
      console.log(JSON.parse(JSON.stringify(state.posts)));
    },
    removePost: (state, action) => {
      console.log("we just hit here");
      console.log(action.payload);
      const updatedPosts = JSON.parse(JSON.stringify(state.posts)).filter(
        (post) => post._id !== action.payload
      );
      state.posts = updatedPosts;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.postsIsLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.postsIsLoading = false;
        state.posts = action.payload.posts;
        state.postsIsSuccess = true;
        state.postCount = action.payload.postCount;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.postsIsLoading = false;
        state.postsIsError = true;
        state.postsErrorMessage = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        // state.postsIsSuccess = true;
        const updatedPosts = JSON.parse(JSON.stringify(state.posts)).filter(
          (post) => post._id !== action.payload.id
        );
        state.posts = updatedPosts;
      })
      .addCase(deletePost.rejected, (state, action) => {
        console.log(action);
        state.postsIsError = true;
        state.postsErrorMessage = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.postsIsSuccess = true;
        state.postsSuccessMessage = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.postsIsError = true;
        state.postsErrorMessage = action.payload;
      });
  },
});

export const { reset, addCommentToPost, testState, removePost } =
  postListSlice.actions;

export default postListSlice.reducer;
