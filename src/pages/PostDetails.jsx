import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import CommentBox from "../components/CommentBox";
import { useSelector, useDispatch } from "react-redux";
import {
  getSinglePost,
  filterPostList,
} from "../features/singlePost/singlePostSlice";
import { Link } from "react-router-dom";
import { reset, makeComment } from "../features/postComment/postCommentSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Blocks, Circles, ThreeDots } from "react-loader-spinner";
import dateFormat from "dateformat";
import { ToastContainer, toast } from "react-toastify";
import toastifyConfig from "../utils/toastify";
import { testState } from "../features/postList/postListSlice";
import { updatePostComment } from "../features/singlePost/singlePostSlice";

function PostDetails() {
  //   const [currentPost, setCurrentPost] = useState(null);
  const altImage =
    "https://dunistech.ng/images/EXECUTIVE%20CLASS@DUNISTECH.JPG";
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { slug } = params;
  const { post, postIsLoading, postIsError, postIsSuccess, postErrorMessage } =
    useSelector((state) => state.singlePost);
  const { posts } = useSelector((state) => state.postList);
  const { isAuthenticated, user } = useSelector((state) => state.auth); //use this to alter our comment box
  const {
    comment,
    postCommentIsLoading,
    postCommentIsSuccess,
    postCommentIsError,
    postCommentErrorMessage,
    postCommentSuccessMessage,
  } = useSelector((state) => state.postComment);

  useEffect(() => {
    //if there are posts, we want to filter the posts and get the post
    if (posts) {
      dispatch(filterPostList({ posts, slug }));
    } else {
      dispatch(getSinglePost(slug));
    }
  }, []);
  const placeComment = () => {
    if (text.length > 0) {
      dispatch(makeComment({ postId: post._id, text })).then(() => {
        setText("");
      });
    } else {
      //get this done in another way
      alert("You cannot place an empty comment");
    }
  };
  console.log(user);
  return (
    <>
      <Navbar />
      <Container>
        {postIsLoading ? (
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
          <section className="py-10 font-montserrat">
            <div className=" w-full md:w-[50%] mx-auto my-7">
              {/* going to set up a category field in the post model */}
              <span className="text-gray-500 text-xl ">DunisTech news</span>
              <h1 className="font-semibold my-2 text-2xl md:text-5xl">
                {" "}
                {post?.title}
              </h1>
              <span className="text-gray-500 text-sm md:text-xl ">
                {dateFormat(post?.createdAt, "longDate")}
              </span>
            </div>
            <img
              className="h-[300px] md:h-[500px] w-full object-cover"
              src={post?.image ? post.image.url : altImage}
              alt="post image"
            />

            {/* post body */}
            <div className="w-full my-7 md:max-w-4xl mx-auto">
              <p className="leading-loose">{post?.body}</p>
              {/* comment textfield */}
              <div className="flex flex-col space-y-2 mt-7">
                <h3 className="font-bold text-lg">Comments:</h3>
                {post?.comments.map((comment) => (
                  <CommentBox key={comment._id} comment={comment} />
                ))}
                <div className="flex items-center">
                  {!isAuthenticated ? (
                    <p className="text-sm">
                      <Link
                        to={"/register"}
                        className="text-blue-500 underline text-sm"
                      >
                        Register
                      </Link>{" "}
                      or{" "}
                      <Link
                        to={"/login"}
                        className="text-blue-500 underline text-sm"
                      >
                        login
                      </Link>{" "}
                      to place a comment
                    </p>
                  ) : !user?.authorized && user.role !== "admin" ? (
                    <p className="text-sm bg-red-300 p-1 rounded-md">
                      Account not yet authorized. kindly wait till you are
                      authorized by the admin to place a comment on this post.
                      Do well to refresh the page or sign out and in again to
                      check if you have been authorized. Thank you!!
                    </p>
                  ) : (
                    <>
                      {" "}
                      <input
                        type="text"
                        name="comment"
                        className="flex-1 border border-gray-500 outline-none rounded-md p-2 "
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                      />
                      <button
                        onClick={placeComment}
                        disabled={postCommentIsLoading}
                        className="bg-orange-500 text-white rounded-md p-2"
                      >
                        {postCommentIsLoading ? "Sending...." : "  Comment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default PostDetails;
