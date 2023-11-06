import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import Forum from "./pages/Forum";
import ForumPostDetails from "./pages/ForumPostDetails";
import Overlayloader from "./components/Overlayloader";
import AdminLayout from "./components/Admin/AdminLayout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reAuthenticate } from "./features/auth/authSlice";
import Posts from "./pages/admin/Posts";
import CreatePost from "./pages/admin/CreatePost";
import Users from "./pages/admin/Users";
import ForumPosts from "./pages/admin/ForumPosts";
import UpdatePost from "./pages/admin/UpdatePost";
import CreateProfile from "./pages/admin/CreateProfile";
import AdminRoutes from "./components/Admin/AdminRoutes";
import UserProfile from "./pages/UserProfile";
import Page404 from "./pages/Page404";
import SessionExpiredModal from "./components/SessionExpiredModal";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isSessionExpired } = useSelector((state) => state.session);
  const [appLoading, setAppLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(reAuthenticate(token))
        .then(() => {
          // navigate("/dashboard");
          setAppLoading(false);
        })
        .catch((error) => {
          // navigate("/login");
          setAppLoading(false);
        });
    } else {
      // navigate("/login");
      setAppLoading(false);
    }
  }, []);
  if (appLoading) {
    return <Overlayloader />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:slug" element={<PostDetails />} />
        <Route path="/forum" element={<Forum />} />
        {user && user.role === "user" && (
          <Route path="/profile" element={<UserProfile />} />
        )}

        <Route path="/forum/:id" element={<ForumPostDetails />} />
        {/* to be protected for admin only */}
        {/* <Route path="/admin" element={<AdminLayout />}>
        <Route path="posts" element={<Posts />} />

        <Route path="posts/create" element={<CreatePost />} />
        <Route path="posts/update/:slug" element={<UpdatePost />} />
        <Route path="users" element={<Users />} />
        <Route path="forum-posts" element={<ForumPosts />} />
        <Route path="create-profile" element={<CreateProfile />} />
      </Route> */}
        {/* The * because we will have things nested */}
        {user && user.role === "admin" && (
          <Route path="/admin/*" element={<AdminRoutes />} />
        )}

        <Route path="*" element={<Page404 />} />
      </Routes>
      {isSessionExpired && <SessionExpiredModal />}
    </>
  );
}

export default App;
