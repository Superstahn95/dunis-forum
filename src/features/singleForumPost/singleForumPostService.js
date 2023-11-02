import client from "../../utils/client";

const getSingleForumPost = async (id) => {
  const response = await client.get(`forumpost/${id}`);
  return response.data.forumPost;
};
const filterForumPosts = (data) => {
  const { id, forumPosts } = data;
  return forumPosts.find((post) => post._id === id);
};

const singleForumPostService = { getSingleForumPost, filterForumPosts };

export default singleForumPostService;
