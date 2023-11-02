import client from "../../utils/client";

// forumpostcomment
const makeForumComment = async (data) => {
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

  const response = await client.post("forumpostcomment", data, config);
  return response.data;
};

const deleteForumComment = async (id) => {
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
  const response = await client.delete(`forumpostcomment/${id}`, config);
  return response.data.message;
};

const forumPostCommentService = { makeForumComment, deleteForumComment };

export default forumPostCommentService;
