import React from "react";

function ForumComment() {
  return (
    <div className="mt-3 bg-green-700 flex  space-x-4 p-5 rounded-lg font-montserrat">
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt=""
        className="w-24 h-24"
      />
      <div className="flex-1">
        <h2 className="text-white font-bold">Joel Chukwuemeka</h2>
        <span className=" text-gray-400 text-sm">Posted 3 hours ago</span>

        {/* body section */}
        <div>
          <p className="text-white leading-loose">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
            ducimus debitis optio esse. Rem ipsum iste, voluptates nemo
            accusantium nobis sed? Hic cupiditate quibusdam magnam commodi
            fugiat amet, explicabo voluptas.
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
