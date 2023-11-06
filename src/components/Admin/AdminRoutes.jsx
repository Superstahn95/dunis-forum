import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreatePost from "../../pages/admin/CreatePost";
import CreateProfile from "../../pages/admin/CreateProfile";
import ForumPosts from "../../pages/admin/ForumPosts";
import Posts from "../../pages/admin/Posts";
import UpdatePost from "../../pages/admin/UpdatePost";
import Users from "../../pages/admin/Users";
import AdminLayout from "./AdminLayout";
import AdminManageProfile from "../../pages/admin/AdminManageProfile";
import Subscription from "../../pages/admin/Subscription";

function AdminRoutes() {
  // Replace with your user role check logic
  const { user } = useSelector((state) => state.auth);
  // const userRole = useSelector((state) => state.auth.user.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role === "user") {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <Routes>
      {/* <Route index element={<AdminLayout />} /> */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="posts" element={<Posts />} />
        <Route path="posts/create" element={<CreatePost />} />
        <Route path="posts/update/:slug" element={<UpdatePost />} />
        <Route path="users" element={<Users />} />
        <Route path="forum-posts" element={<ForumPosts />} />
        <Route path="create-profile" element={<CreateProfile />} />
        <Route path="manage-profile" element={<AdminManageProfile />} />
        <Route path="subscribers" element={<Subscription />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
