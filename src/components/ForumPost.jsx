import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import dateFormat from "dateformat";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";

function ForumPost({ post, setDeleting, handleDelete }) {
  const { user } = useSelector((state) => state.auth);
  const altImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const handleClick = () => {
    handleDelete(post._id);
  };
  return (
    <div className=" bg-green-700 flex flex-col rounded-md min-h-[200px] font-montserrat mb-7 p-4 cursor-pointer group hover:bg-green-600 transition duration-500 ease-in-out">
      {/* name and delete details */}
      <div className=" mb-4 flex space-x-2">
        <div>
          {" "}
          <img
            src={
              post?.author.profilePhoto
                ? post?.author.profilePhoto.url
                : altImage
            }
            alt="display picture"
            className="w-10 h-10"
          />
        </div>
        <div className="flex flex-col  ">
          <span className="text-gray-300 text-sm font-bold">
            {post?.author.name}
          </span>
          <span className="text-gray-300 text-xs">
            {dateFormat(post?.createdAt, "longDate")}
          </span>
        </div>
        {/* date of post */}
      </div>
      <Link
        to={`/forum/${post._id}`}
        className="text-gray-200 group-hover:underline"
      >
        {post.isCodeSnippet === true ? post.description : post.content}
      </Link>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-gray-200 text-xs">
          {post?.forumComments.length} comments
        </span>
        {user?._id === post.author._id && (
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleClick();
            }}
            className="bg-orange-500 rounded-md p-1 "
          >
            <TrashIcon className="w-5 h-5" color="white" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ForumPost;
