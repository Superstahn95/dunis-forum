import MyTextInput from "./MyTextField";
import { useState } from "react";

function ForumPostForm({ setShowForm }) {
  const closeForm = (e) => {
    e.preventDefault();
    setShowForm(false);
  };
  const [type, setType] = useState("text");
  return (
    <div className="w-full sm:w-[600px] rounded-md bg-green-800 fixed bottom-0 left-[50%] -translate-x-1/2 h-[300px] p-3 font-montserrat">
      <form className="h-full flex flex-col">
        {/* title, post type and profile picture div */}
        <div className="flex items-center border-b border-gray-700">
          <input
            type="text"
            name="title"
            placeholder="Add title"
            className=" outline-none flex-1 bg-transparent py-3 text-white"
          />

          <select
            name="type"
            className="outline-none bg-transparent p-5 text-white"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="codeSnippet">Code Snippet</option>
          </select>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
            className="ml-2 w-8 h-8 "
          />
        </div>
        {/* optional text for code snippets */}
        {type === "codeSnippet" && (
          <div className="flex items-center border-b border-gray-700">
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              className=" outline-none flex-1 bg-transparent py-3 text-white"
            />
          </div>
        )}

        <div className="flex-1 ">
          <textarea
            name="body"
            id=""
            placeholder={
              type === "text" ? "What's in your mind?" : "Enter code snippet"
            }
            className="border-none w-full bg-transparent h-full outline-none text-white "
          ></textarea>
        </div>
        {/* controls */}
        <div className="flex items-center border-t py-1 border-gray-700">
          <div className="ml-auto space-x-3">
            <button className="bg-orange-500 text-white rounded-md w-24 p-2">
              Post
            </button>
            <button
              onClick={(e) => closeForm(e)}
              className="bg-red-500 text-white rounded-md w-24 p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForumPostForm;
