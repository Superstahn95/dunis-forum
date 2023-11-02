import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../components/Table";
import {
  getAllForumPosts,
  reset,
  deleteForumPost,
} from "../../features/forumPost/forumPostSlice";
import FeatureLoader from "../../components/FeatureLoader";
import ForumPostViewModal from "../../components/Admin/ForumPostViewModal";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../../utils/toastify";

function ForumPosts() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingRows, setLoadingRows] = useState({});
  const [dataFetched, setDataFetched] = useState(false);
  const [id, setId] = useState("");
  const handleDelete = (id) => {
    const newLoadingRows = { ...loadingRows };
    newLoadingRows[id] = true;
    setLoadingRows(newLoadingRows);
    setLoading(true);
    dispatch(deleteForumPost(id)).then(() => {
      setLoading(false);
      newLoadingRows[id] = false;
      setLoadingRows(newLoadingRows);
    });
  };
  const handleView = (id) => {
    setId(id);
    setShowModal(true);
  };
  const columns = [
    { name: "Name", selector: (row) => row.author.name },
    { name: "Title", selector: (row) => row.title },
    {
      name: "Code Snippet",
      selector: (row) =>
        row.isCodeSnippet ? (
          <span className=" flex items-center justify-center text-green-700 text-xs p-1 ">
            True
          </span>
        ) : (
          <span className="flex items-center justify-center text-red-700 text-xs p-1">
            False
          </span>
        ),
    },

    { name: "Number of Comments", selector: (row) => row.forumComments.length },
    {
      name: "Date Posted",
      selector: (row) => dateFormat(row.createdAt, "longDate"),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-col md:flex-row items-center space-x-1">
          <button
            disabled={loading}
            onClick={() => handleView(row._id)}
            className="bg-orange-500 w-20 rounded-md text-white px-3 py-2"
          >
            View
          </button>

          <button
            disabled={loading}
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 w-20 rounded-md text-white px-3 py-2"
          >
            {loadingRows[row._id] ? "Deleting..." : "Delete"}
          </button>
        </div>
      ),
    },
  ];
  const {
    forumPosts,
    forumPostsIsLoading,
    forumPostCount,
    forumPostsIsError,
    forumPostsIsSuccess,
    forumPostsErrorMessage,
  } = useSelector((state) => state.forumPost);
  useEffect(() => {
    if (!dataFetched) {
      dispatch(getAllForumPosts());
      setDataFetched(true);
    }
    if (forumPostsIsError) {
      toast.error(forumPostsErrorMessage, toastifyConfig);
    }
    const resetTimeout = setTimeout(() => {
      dispatch(reset());
    }, 500);
    return () => {
      clearTimeout(resetTimeout);
    };
  }, [forumPostsIsError, forumPostsErrorMessage, dataFetched, dispatch]);

  return (
    <div className="font-montserrat">
      <h2 className=" font-bold text-2xl">Manage Forum Posts</h2>
      {forumPostsIsLoading ? (
        <FeatureLoader text="Fetching Forum Posts" />
      ) : forumPosts ? (
        <div className="grid col-1 bg-white shadow-sm dark:bg-slate-800 font-montserrat mt-8">
          <Table tableHeaders={columns} tableDetails={forumPosts} />
        </div>
      ) : (
        <div className="w-full p-4 bg-red-400 flex items-center jusify-center">
          <p>There are currently no forum posts yet</p>
        </div>
        // <p>No Forum posts available</p>
      )}
      {showModal && <ForumPostViewModal setShowModal={setShowModal} id={id} />}
      <ToastContainer />
    </div>
  );
}

export default ForumPosts;
