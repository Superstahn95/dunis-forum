import CodeHighlighter from "../CodeHighlighter";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";

function ForumPostViewModal({ setShowModal, id }) {
  const [forumPost, setForumPost] = useState(null);
  const { forumPosts } = useSelector((state) => state.forumPost);

  useEffect(() => {
    setForumPost(forumPosts.filter((post) => post._id == id)[0]);
  }, [forumPosts]);

  return (
    <div className="fixed z-[100] top-0 left-0 w-full h-full  bg-black/80  flex items-center justify-center">
      <div
        onClick={() => setShowModal(false)}
        className="bg-white absolute top-5 right-5 p-2 rounded-full cursor-pointer"
      >
        <XMarkIcon className="w-4 h-4 text-black" />
      </div>
      <div className="bg-white w-[90%] md:w-[600px] p-4 max-h-[700px] overflow-y-scroll">
        <h2 className=" font-bold">
          {forumPost?.author.name}
          {/* Post by Stanley Chukwuemeka */}
        </h2>
        <span className=" text-gray-400 text-sm">
          {dateFormat(forumPost?.createdAt, "longDate")}
          {/* Oct 23, 2023 */}
        </span>

        {/* title div */}
        <div className="my-4 bg-green-800 p-1 rounded-md">
          <h1 className="text-white font-montserrat font-bold text-xl">
            {forumPost?.title}
            {/* This is my post title */}
          </h1>
        </div>
        {/* description */}
        <div>
          {/* <p className="text-white leading-loose">
            {forumPost?.isCodeSnippet
             ? forumPost?.description
             : forumPost?.content}
             </p> */}
          <div className="text-white leading-loose">
            {forumPost?.isCodeSnippet ? (
              <p className="text-black">{forumPost?.description}</p>
            ) : (
              <p className="text-black">{forumPost?.content}</p>
            )}
          </div>
        </div>
        {/* {forumPost?.isCodeSnippet && (
                    <div className="my-4">
                      <CodeHighlighter code={forumPost.content} />
                    </div>
        )} */}
        {forumPost?.isCodeSnippet && (
          <div className="my-4">
            <CodeHighlighter
              code={forumPost?.content}
              language={forumPost?.language}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumPostViewModal;
