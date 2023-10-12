import React from "react";

function CommentBox() {
  return (
    <div className="bg-gray-300 py-2 rounded-md px-1">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold">Stanley Chukwuemeka</span>
        <div className="">
          <span className="text-[12px] ">14/10/2023</span>
          {/* delete functionality should be in here as well */}
        </div>
      </div>
      <p className="text-[12px]">When is registration starting?</p>
    </div>
  );
}

export default CommentBox;
