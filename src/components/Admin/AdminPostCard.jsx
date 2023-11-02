import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

function AdminPostCard({ post, handleDelete, loading, setLoading }) {
  const altImage =
    "https://dunistech.ng/images/EXECUTIVE%20CLASS@DUNISTECH.JPG";
  const { image, body, createdAt, title, slug } = post;
  const truncate = (str, max = 15) => {
    const array = str.trim().split(" ");
    const ellipsis = array.length > max ? "..." : "";

    return array.slice(0, max).join(" ") + ellipsis;
  };
  const handleClick = () => {
    setLoading(true);
    handleDelete(post._id);
  };
  return (
    <div to={`post/${slug}`} className="flex flex-col font-montserrat">
      <div className="mb-2 ">
        <img
          src={image ? image.url : altImage}
          alt="post image"
          className="max-h-[200px] min-w-full object-cover"
        />
      </div>
      {/* post card content */}
      <div>
        {/* category */}
        <span className="text-gray-500 text-xs ">Kids coding</span>
        {/* title  */}
        <h2 className="font-semibold mt-2">{title}</h2>
        {/* body */}
        <p className="mb-2 text-[14px]">{truncate(body)}</p>
        {/* date */}
        <span className="text-gray-500 text-xs ">
          {dateFormat(createdAt, "longDate")}
        </span>
      </div>
      {/* delete and edit buttons */}
      <div className="flex items-center space-x-2">
        <Link
          to={`/admin/posts/update/${post.slug}`}
          className="bg-blue-500 p-2 rounded-md"
        >
          <PencilIcon className="w-4 h-4 text-white" />
        </Link>
        <button
          disabled={loading}
          className="bg-red-500 p-2 rounded-md cursor-pointer"
        >
          <TrashIcon className="w-4 h-4 text-white" onClick={handleClick} />
        </button>
      </div>
    </div>
  );
}

export default AdminPostCard;
