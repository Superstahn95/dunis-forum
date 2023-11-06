import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";

function PostCard({ post, isAdminPage }) {
  const altImage =
    "https://dunistech.ng/images/EXECUTIVE%20CLASS@DUNISTECH.JPG";
  const { image, body, createdAt, title, slug } = post;
  const truncate = (str, max = 40) => {
    const array = str.trim().split(" ");
    const ellipsis = array.length > max ? "..." : "";

    return array.slice(0, max).join(" ") + ellipsis;
  };

  return (
    <Link to={`post/${slug}`} className="flex flex-col font-montserrat">
      <div className="mb-2 ">
        <img
          src={image ? image.url : altImage}
          alt="post image"
          className="max-h-[300px] min-w-full object-cover"
        />
      </div>
      {/* post card content */}
      <div>
        {/* category */}
        <span className="text-gray-500 text-xs ">DunisTech news</span>
        {/* title  */}
        <h2 className="font-semibold mt-2">{title}</h2>
        {/* body */}
        <p className="mb-2 text-[14px]">{truncate(body)}</p>
        {/* date */}
        <span className="text-gray-500 text-xs ">
          {dateFormat(createdAt, "longDate")}
        </span>
      </div>
    </Link>
  );
}

export default PostCard;
