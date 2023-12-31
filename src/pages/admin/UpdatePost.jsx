import { useSelector, useDispatch } from "react-redux";
import PostForm from "../../components/Form/PostForm";
import { useState } from "react";
import {
  getSinglePost,
  reset,
  filterPostList,
  updatePost,
} from "../../features/singlePost/singlePostSlice";
import { useEffect } from "react";
import toastifyConfig from "../../utils/toastify";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import FeatureLoader from "../../components/FeatureLoader";
import { useNavigate } from "react-router-dom";
function UpdatePost() {
  // const [data, setData] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;
  //when this loads, i want to fetch the data from maybe my backend or from the posts
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [postUpdated, setPostUpdated] = useState(false);
  const {
    post,
    postIsError,
    postIsLoading,
    postIsSuccess,
    postErrorMessage,
    postSuccessMessage,
  } = useSelector((state) => state.singlePost);
  const { posts } = useSelector((state) => state.postList);

  const handleSubmit = (values) => {
    // values.forEach((value) => console.log(value));
    const data = { values: values, id: post?._id };

    setLoading(true);
    dispatch(updatePost(data)).then(() => {
      setLoading(false);
      setPostUpdated(true);
    });
  };
  useEffect(() => {
    //if there are posts, we want to filter the posts and get the post
    if (!postUpdated) {
      if (posts) {
        dispatch(filterPostList({ posts, slug }));
      } else {
        dispatch(getSinglePost(slug));
      }
    }
    if (postErrorMessage === "Post not found") {
      toast.error(postErrorMessage, toastifyConfig);
      dispatch(reset());
      navigate("/admin/posts");
    }
    if (postIsError) {
      toast.error(postErrorMessage, toastifyConfig);
    }
    if (postIsSuccess) {
      toast.success(postSuccessMessage, toastifyConfig);
    }
    return () => dispatch(reset());
  }, [slug, postErrorMessage, postIsError, dispatch, postUpdated]);
  //   useEffect(() => {
  //     if (postsIsError) {
  //       toast.error(postsErrorMessage, toastifyConfig);
  //     }
  //     if (postsSuccessMessage) {
  //       toast.success(postsSuccessMessage, toastifyConfig);
  //     }
  //     return () => {
  //       dispatch(reset());
  //     };
  //   }, [postsIsError, postsIsSuccess, postsSuccessMessage, postsErrorMessage]);

  const initialData = {
    title: post?.title || "",
    slug: post?.slug || "",
    body: post?.body || "",
  };

  //   useEffect(() => {
  //     if (postIsError) {
  //       toast.error(postErrorMessage, toastifyConfig);
  //     }
  //     if (postSuccessMessage) {
  //       toast.success(postSuccessMessage, toastifyConfig);
  //     }
  //     dispatch(reset());
  //   }, [postIsError, postSuccessMessage, postErrorMessage, dispatch]);

  return (
    <div className="font-montserrat">
      <h2 className="font-bold text-2xl text-gray-700">Update Post</h2>
      <div className="my-7">
        {postIsLoading ? (
          <FeatureLoader text="Fetching Post" />
        ) : (
          <PostForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={loading}
            text="Update Post"
            // thumbnail={post.image}
          />
        )}
      </div>
      {loading && <FeatureLoader text="Updating Post" />}
      <ToastContainer />
    </div>
  );
}

export default UpdatePost;
