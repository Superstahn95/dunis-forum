import dateFormat from "dateformat";

function ForumComment({ comment }) {
  const altImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <div className="mt-3 bg-green-700 flex  space-x-4 p-5 rounded-lg font-montserrat">
      <img
        src={
          comment?.author.profilePhoto
            ? comment.author.profilePhoto.url
            : altImage
        }
        alt=""
        className="w-10 h-10 md:w-24 md:h-24"
      />
      <div className="flex-1">
        <h2 className="text-white font-bold">{comment?.author.name}</h2>
        <span className=" text-gray-400 text-xs md:text-sm ">
          {dateFormat(comment?.createdAt, "longDate")}
        </span>

        {/* body section */}
        <div>
          <p className="text-white leading-loose text-sm md:text-lg">
            {comment?.text}
          </p>
        </div>
        {/* code block */}
        {/* <div className="my-4">
          <CodeHighlighter />
        </div> */}
      </div>
    </div>
  );
}

export default ForumComment;
