import client from "../../utils/client";

const createForumPost = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.post("forumpost", data, config);
  return response.data.forumPost;
};

const getAllForumPosts = async (data = {}) => {
  const { pageNo, limit } = data;

  const response = await client.get(
    `forumpost?pageNo=${pageNo}&limit=${limit}`
  );
  return response.data;
};

const deleteForumPost = async (id) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token"); //look for a better way of handling this error
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await client.delete(`forumpost/${id}`, config);
  return response.data.message;
};
const forumPostService = { createForumPost, getAllForumPosts, deleteForumPost };

export default forumPostService;
