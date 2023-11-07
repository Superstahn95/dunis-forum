import { useSelector, useDispatch } from "react-redux";
import PostForm from "../../components/Form/PostForm";
import { useState } from "react";
import { createPost, reset } from "../../features/postList/postListSlice";
import { useEffect } from "react";
import toastifyConfig from "../../utils/toastify";
import { ToastContainer, toast } from "react-toastify";
import FeatureLoader from "../../components/FeatureLoader";

// post: null,
// postIsLoading: false,
// postIsError: false,
// postIsSuccess: false,
// postErrorMessage: "",
// postSuccessMessage: "",
function CreatePost({}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    postsIsLoading,
    postsIsError,
    postsIsSuccess,
    postsErrorMessage,
    postsSuccessMessage,
  } = useSelector((state) => state.postList);
  const initialData = {
    title: "",
    slug: "",
    body: "",
  };
  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(createPost(values)).then(() => setLoading(false));
  };

  useEffect(() => {
    if (postsIsError) {
      toast.error(postsErrorMessage, toastifyConfig);
    }
    if (postsSuccessMessage) {
      toast.success(postsSuccessMessage, toastifyConfig);
    }
    return () => {
      dispatch(reset());
    };
  }, [postsIsError, postsIsSuccess, postsSuccessMessage, postsErrorMessage]);

  return (
    <div className="font-montserrat">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl text-gray-700">Create Post</h2>
        {/* image div */}
        {/* <div className="border border-black border-dashed w-[100px] h-[100px]"></div> */}
      </div>

      <div className="my-7">
        <PostForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isLoading={loading}
          text="Upload Post"
        />
      </div>
      {loading && <FeatureLoader text="Uploading Post" />}
      <ToastContainer />
    </div>
  );
}

export default CreatePost;

//requirements for creating a post
//title
//body
//slug
//image
