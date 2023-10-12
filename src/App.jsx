import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import Forum from "./pages/Forum";
import ForumPostDetails from "./pages/ForumPostDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/forum/:id" element={<ForumPostDetails />} />
    </Routes>
  );
}

export default App;
