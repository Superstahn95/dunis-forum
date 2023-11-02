import client from "../../utils/client";

const makeComment = async (data) => {
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

  const response = await client.post("comment", data, config);
  return response.data;
};

const deleteComment = async (id) => {
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
  const response = await client.delete(`comment/${id}`, config);
  return response.data.message;
};

const postCommentService = { makeComment, deleteComment };

export default postCommentService;
