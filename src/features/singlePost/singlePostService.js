import client from "../../utils/client";

const getSinglePost = async (slug) => {
  const response = await client.get(`post/${slug}`);
  return response.data.post;
};
const filterPostList = (data) => {
  const { slug, posts } = data;
  return posts.find((post) => post.slug === slug);
};

const updatePost = async (data) => {
  const { id, values } = data;
  console.log(id);
  //   console.log(values);
  values.forEach((value) => console.log(value));
  console.log("we hit ths functionality");
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
  console.log("about making a call to our backend");
  const response = await client.patch(`post/${id}`, values, config);
  return response.data.message;
};
const singlePostService = {
  getSinglePost,
  filterPostList,
  updatePost,
};

export default singlePostService;
