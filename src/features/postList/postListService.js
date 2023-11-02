import client from "../../utils/client";

const getAllPosts = async (data = {}) => {
  const { pageNo, limit, searchTerm } = data;
  // &searchTerm=${searchTerm}
  const response = await client.get(
    `post?pageNo=${pageNo}&limit=${limit}&searchTerm=${searchTerm}`
  );
  return response.data;
};

const deletePost = async (id) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token found, hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
    },
  };
  const response = await client.delete(`post/${id}`, config);
  return response.data.message;
};
const createPost = async (data) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    return console.log("No token found, hence not authorized");
  }
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      //   "Content-Type": "multipart/form-data",
    },
  };
  const response = await client.post("post", data, config);
  return response.data.message;
};

const postListService = { getAllPosts, deletePost, createPost };

export default postListService;
