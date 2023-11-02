import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import ForumPost from "../components/ForumPost";
import ForumPostForm from "../components/Form/ForumPostForm";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  getAllForumPosts,
  createForumPost,
  deleteForumPost,
} from "../features/forumPost/forumPostSlice";
import { Blocks, Circles } from "react-loader-spinner";
import { useEffect } from "react";
import FeatureLoader from "../components/FeatureLoader";

const limit = 5;
let pageNo = 0;
function Forum() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();
  const {
    forumPosts,
    forumPostsIsLoading,
    forumPostCount,
    forumPostsIsError,
    forumPostsIsSuccess,
    forumPostsErrorMessage,
  } = useSelector((state) => state.forumPost);
  //   console.log(forumPosts);
  //   forumPosts: null,
  //   forumPostsIsLoading: false,
  //   forumPostsIsError: false,
  //   forumPostsIsSuccess: false,
  //   forumPostsErrorMessage: "",
  const handleSubmit = (data) => {
    // console.log(data);
    setLoading(true);
    dispatch(createForumPost(data)).then(() => {
      setLoading(false);
      setShowForm(false);
    });
  };
  const getPaginationCount = (numberOfPosts) => {
    const quotient = numberOfPosts / limit;
    if (quotient % 1 !== 0) {
      return Math.floor(quotient) + 1;
    }
    return quotient;
  };
  const paginationArray = new Array(getPaginationCount(forumPostCount)).fill(
    " "
  );
  const handleDelete = (id) => {
    setDeleting(true);
    dispatch(deleteForumPost(id)).then(() => {
      setDeleting(false);
    });
  };
  const refetchPosts = (page) => {
    pageNo = page;
    dispatch(getAllForumPosts({ pageNo, limit }));
  };
  useEffect(() => {
    dispatch(getAllForumPosts({ pageNo, limit }));
    return () => {
      dispatch(reset());
    };
  }, []);
  return (
    <>
      <Navbar />
      {/* form pop up button */}
      <div
        onClick={() => setShowForm(true)}
        className="fixed right-5 bottom-10 h-20 w-20 text-6xl md:h-24 md:w-24 rounded-full bg-orange-500 text-white cursor-pointer  flex items-center justify-center"
      >
        +
      </div>
      <div></div>
      <section className="min-h-[70vh]  bg-green-800 py-10">
        <Container>
          {forumPostsIsLoading ? (
            <section className="min-h-[50vh] flex items-center justify-center">
              <Circles
                height="80"
                width="80"
                color="#ff9800"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </section>
          ) : (
            <>
              {forumPosts?.length < 1 ? (
                <section className="min-h-[50vh] flex items-center justify-center">
                  <div className="text-white font-montserrat text-center text-xl md:text-3xl">
                    There are currently no posts in this forum
                  </div>
                </section>
              ) : (
                forumPosts?.map((post) => (
                  <ForumPost
                    key={post?._id}
                    post={post}
                    setDeleting={setDeleting}
                    handleDelete={handleDelete}
                  />
                ))
              )}
            </>
          )}
          {paginationArray.length > 1 ? (
            <div className="flex items-center justify-center space-x-3 py-2">
              {paginationArray.map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => refetchPosts(index)}
                    className={`w-[30px] h-[30px] flex items-center justify-center text-white font-montserrat font-bold border border-orange-500  py-1 px-2   ${
                      index === pageNo && "bg-orange-500"
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
        </Container>
        {deleting && <FeatureLoader text="deleting post" />}
      </section>
      {showForm && (
        <ForumPostForm
          setShowForm={setShowForm}
          onSubmit={handleSubmit}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      <Footer />
    </>
  );
}

export default Forum;
