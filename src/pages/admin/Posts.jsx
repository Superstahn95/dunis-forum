import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  getAllPosts,
  deletePost,
} from "../../features/postList/postListSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPostCard from "../../components/Admin/AdminPostCard";
import FeatureLoader from "../../components/FeatureLoader";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../../utils/toastify";

const limit = 9;
let pageNo = 0;
function Posts() {
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch();
  const {
    posts,
    postsIsLoading,
    postsIsError,
    postsIsSuccess,
    postsErrorMessage,
    postCount,
    postsSuccessMessage,
  } = useSelector((state) => state.postList);
  const {
    subscriberIsError,
    subscriberIsLoading,
    subscriberErrorMessage,
    subscriberIsSuccess,
    subscriberSuccessMessage,
  } = useSelector((state) => state.subscriber);

  console.log(subscriberIsSuccess);

  useEffect(() => {
    // dispatch(testConsole({ check: "This is working" }));
    if (!dataFetched) {
      dispatch(getAllPosts({ pageNo, limit, searchTerm: "" }));
      setDataFetched(true);
    }
    if (postsIsError) {
      toast.error(postsErrorMessage, toastifyConfig);
    }
    const resetTimeout = setTimeout(() => {
      dispatch(reset());
    }, 500);
    return () => {
      clearTimeout(resetTimeout);
    };
  }, [dataFetched, postsErrorMessage, dispatch, postsIsError]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => setLoading(false));
  };
  const getPaginationCount = (numberOfPosts) => {
    const quotient = numberOfPosts / limit;
    if (quotient % 1 !== 0) {
      return Math.floor(quotient) + 1;
    }
    return quotient;
  };
  const paginationArray = new Array(getPaginationCount(postCount)).fill(" ");
  const refetchPosts = (page) => {
    pageNo = page;
    dispatch(getAllPosts({ pageNo, limit, searchTerm: "" }));
  };

  return (
    <div className="font-montserrat relative min-h-screen -z-[5px]">
      <div className="flex items-center justify-between">
        <h2 className=" font-bold text-2xl">Blog Posts</h2>
        <Link
          to={"/admin/posts/create"}
          className="bg-orange-500 text-white px-3 py-2 rounded-md"
        >
          New Blog Post
        </Link>
      </div>
      {postsIsLoading ? (
        <FeatureLoader text="Fetching Blog Posts" />
      ) : (
        <>
          {posts?.length < 1 ? (
            <section className="min-h-[50vh] flex items-center justify-center">
              <div className="text-black font-montserrat text-3xl">
                No blog posts!!!!
              </div>
            </section>
          ) : (
            <section className="grid md:grid-cols-3 py-10 gap-8">
              {posts?.map((post) => (
                <AdminPostCard
                  key={post._id}
                  post={post}
                  handleDelete={handleDelete}
                  loading={loading}
                  setLoading={setLoading}
                />
              ))}
            </section>
          )}
        </>
      )}
      {paginationArray.length > 1 ? (
        <div className="flex items-center absolute bottom-0  left-[50%] -translate-x-1/2 mt-5 justify-center space-x-3 py-2">
          {paginationArray.map((_, index) => {
            return (
              <button
                key={index}
                onClick={() => refetchPosts(index)}
                className={`w-[30px] h-[30px] flex items-center justify-center text-gray-700 font-montserrat font-bold border border-orange-500  py-1 px-2   ${
                  index === pageNo && "bg-orange-500 "
                }`}
              >
                {/* index === pageNo
                         ? "text-blue-500 bg-orange-500 border border-orange-500 py-1 px-2 "
                         : "text-gray-500" */}
                {index + 1}
              </button>
            );
          })}
        </div>
      ) : null}
      {loading && <FeatureLoader text={"Deleting Post"} />}
      <ToastContainer />
    </div>
  );
}

export default Posts;
