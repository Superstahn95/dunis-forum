import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postListReducer from "../features/postList/postListSlice";
import singlePostReducer from "../features/singlePost/singlePostSlice";
import postCommentReducer from "../features/postComment/postCommentSlice";
import forumPostReducer from "../features/forumPost/forumPostSlice";
import singleForumPostSliceReducer from "../features/singleForumPost/singleForumPostSlice";
import usersReducer from "../features/users/usersSlice";
import newsSubscriberReducer from "../features/newsSubscription/newsSubscriptionSlice";
import sessionReducer from "../features/session/sessionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    postList: postListReducer,
    singlePost: singlePostReducer,
    postComment: postCommentReducer,
    forumPost: forumPostReducer,
    singleForumPost: singleForumPostSliceReducer,
    users: usersReducer,
    subscriber: newsSubscriberReducer,
    session: sessionReducer,
  },
});

export default store;
