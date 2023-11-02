import React from "react";
import { useSelector, useDispatch } from "react-redux";
import dateFormat from "dateformat";
import { deleteComment } from "../features/postComment/postCommentSlice";
function CommentBox({ comment }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleCommentDelete = () => {
    dispatch(deleteComment(comment._id));
  };

  return (
    <div className="bg-gray-300 py-2 rounded-md px-1">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold">{comment.author.name}</span>
        <div className="">
          <span className="text-[12px] ">
            {dateFormat(comment.createdAt, "longDate")}
          </span>
          {/* delete functionality should be in here as well */}
        </div>
      </div>
      <p className="text-[12px]">{comment.text}</p>
      {user?._id === comment.author._id && (
        <button onClick={handleCommentDelete} className="text-blue-500 text-xs">
          Delete
        </button>
      )}
    </div>
  );
}

export default CommentBox;
