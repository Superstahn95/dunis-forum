import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ForumComment from "../components/ForumComment";
import Container from "../components/Container";
import CodeHighlighter from "../components/CodeHighlighter";
import ForumPostForm from "../components/Form/ForumPostForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSingleForumPost,
  filterForumPost,
} from "../features/singleForumPost/singleForumPostSlice";
import {
  makeForumComment,
  deleteForumComment,
} from "../features/forumPostComment/forumPostCommentSlice";
import { Circles } from "react-loader-spinner";
import dateFormat from "dateformat";

function ForumPostDetails() {
  const params = useParams();
  const altImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const { id } = params;
  //   const params = useParams();
  //   const { slug } = params;
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    forumPost,
    forumPostIsLoading,
    forumPostIsError,
    forumPostIsSuccess,
    forumPostErrorMessage,
  } = useSelector((state) => state.singleForumPost);
  const { forumPosts } = useSelector((state) => state.forumPost);
  useEffect(() => {
    //if there are posts, we want to filter the posts and get the post
    if (forumPosts) {
      dispatch(filterForumPost({ forumPosts, id }));
    } else {
      dispatch(getSingleForumPost(id));
    }
  }, []);
  const handleCommentSubmit = (e, data) => {
    e.preventDefault();
    setLoading(true);
    dispatch(makeForumComment({ ...data, forumPostId: forumPost._id })).then(
      () => {
        setLoading(false);
        setShowForm(false);
      }
    );
  };

  return (
    <>
      <Navbar />
      <section className="min-h-[70vh]  bg-green-800 py-10">
        <Container>
          {forumPostIsLoading ? (
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
              <div className="flex flex-col  md:flex-row bg-green-700 space-x-4 p-5 rounded-lg font-montserrat">
                <img
                  src={
                    forumPost?.author.profilePhoto
                      ? forumPost.author.profilePhoto.url
                      : altImage
                  }
                  alt=""
                  className="w-14 h-14 ml-3 md:ml-0 md:w-24 md:h-24"
                />
                <div className="flex-1">
                  <h2 className="text-white font-bold">
                    {forumPost?.author.name}
                  </h2>
                  <span className=" text-gray-400 text-sm">
                    {dateFormat(forumPost?.createdAt, "longDate")}
                  </span>
                  {/* title div */}
                  <div className="my-4 bg-green-800 p-4 rounded-md">
                    <h1 className="text-white font-montserrat font-bold text-xl md:text-3xl">
                      {forumPost?.title}
                    </h1>
                  </div>
                  {/* body section */}
                  <div>
                    <p className="text-white leading-loose text-sm md:text-lg">
                      {forumPost?.isCodeSnippet
                        ? forumPost?.description
                        : forumPost?.content}
                    </p>
                  </div>
                  {/* code block */}
                  {forumPost?.isCodeSnippet && (
                    <div className="my-4">
                      <CodeHighlighter
                        code={forumPost.content}
                        language={forumPost.language}
                      />
                    </div>
                  )}
                </div>
              </div>
              {/* to be replaced bby actual forum post comment */}
              {forumPost?.forumComments.map((comment) => (
                <ForumComment key={comment._id} comment={comment} />
              ))}

              {/* trigger reply button */}
              <div
                onClick={() => setShowForm(true)}
                className="my-4 px-4 border border-dashed border-orange-500 rounded-md flex items-center space-x-2 cursor-pointer"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt=""
                  className="w-10 h-10"
                />
                <button className="p-4 bg-transparent font-montserrat text-white">
                  Write a reply
                </button>
              </div>
            </>
          )}

          {showForm && (
            <ForumPostForm
              setShowForm={setShowForm}
              loading={loading}
              setLoading={setLoading}
              onSubmit={handleCommentSubmit}
              isCommentPage
            />
          )}
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default ForumPostDetails;
