import MyTextInput from "./MyTextField";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function ForumPostForm({
  setShowForm,
  onSubmit,
  loading,
  setLoading,
  isCommentPage,
}) {
  const [type, setType] = useState("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [isCodeSnippet, setIsCodeSnippet] = useState(false);
  const [text, setText] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { forumPost } = useSelector((state) => state.forumPost);
  const handleSelection = (e) => {
    setType(e.target.value);
    setIsCodeSnippet(e.target.value === "codeSnippet" ? true : false);
  };
  const languages = [
    "html",
    "javascript",
    "python",
    "jsx",
    "php",
    "java",
    "css",
  ];

  const closeForm = (e) => {
    e.preventDefault();
    setShowForm(false);
  };
  //   (e) => onSubmit(e, "data")
  const submitForm = (e) => {
    e.preventDefault();
    let data;
    if (!isCommentPage) {
      data = { title, content, description, isCodeSnippet, language };
    } else {
      data = { text };
    }
    // console.log(data);
    onSubmit(data);
  };

  return (
    <div
      className={`w-full sm:w-[600px] rounded-t-[30px] rounded-md bg-green-800 fixed bottom-0 left-[50%] -translate-x-1/2 p-3 font-montserrat ${
        isCodeSnippet ? "h-[400px]" : "h-[300px]"
      }`}
    >
      {!isAuthenticated ? (
        <div className="flex flex-col items-center">
          <p className="text-white">
            <Link to={"/register"} className="text-gray-200 underline text-sm">
              Register
            </Link>{" "}
            or{" "}
            <Link to={"/login"} className="text-gray-200 underline text-sm">
              login
            </Link>{" "}
            to place a comment
          </p>
          <button
            onClick={(e) => closeForm(e)}
            className="underline text-white mt-2  text-sm "
          >
            Exit
          </button>
        </div>
      ) : !user?.authorized && user.role !== "admin" ? (
        <div className="flex flex-col items-center mt-10">
          <p className="text-sm bg-red-400 text-white p-1 rounded-md">
            Account not yet authorized. kindly wait till you are authorized by
            the admin{" "}
            {isCommentPage
              ? "to place a comment on this post"
              : "to post on this forum"}{" "}
            . Do well to refresh the page or sign out and in again to check if
            you have been authorized. Thank you!!
          </p>
          <button
            onClick={(e) => closeForm(e)}
            className="underline text-white mt-2  text-sm "
          >
            Exit
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => submitForm(e)} className="h-full flex flex-col">
          {/* title, post type and profile picture div */}
          {!isCommentPage && (
            <div className="flex items-center border-b border-gray-700">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add title"
                className=" outline-none flex-1 bg-transparent py-3 text-white"
              />

              <select
                name="type"
                className="outline-none bg-transparent p-5 text-white"
                onChange={(e) => handleSelection(e)}
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
          )}
          {/* optional text for code snippets */}
          {type === "codeSnippet" && (
            <>
              <div className="flex items-center border-b border-gray-700">
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className=" outline-none flex-1 bg-transparent py-3 text-white"
                />
              </div>
              {/* language */}
              <div className="flex items-center py-1 mb-2 border-b border-gray-700">
                <select
                  name="language"
                  className="bg-transparent w-full outline-none text-white"
                  id=""
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>Select Programming language</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="flex-1 ">
            {!isCommentPage && (
              <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  type === "text"
                    ? "What's in your mind?"
                    : "Enter code snippet"
                }
                className="border-none w-full bg-transparent h-full outline-none text-white "
              ></textarea>
            )}
            {isCommentPage && (
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Hey ${user?.name}!! Place a comment`}
                className="border-none w-full bg-transparent h-full outline-none text-white "
              ></textarea>
            )}
          </div>
          {/* controls */}
          <div className="flex items-center border-t py-1 border-gray-700">
            <div className="ml-auto space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white rounded-md text-sm md:text-lg w-fit md:w-24 p-2"
              >
                {loading ? "Sending..." : "Post"}
              </button>
              <button
                disabled={loading}
                onClick={(e) => closeForm(e)}
                className="bg-red-500 text-white rounded-md w-fit text-sm md:text-lg md:w-24 p-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      {/* 
      <form onSubmit={(e) => submitForm(e)} className="h-full flex flex-col">
        title, post type and profile picture div
        {!isCommentPage && (
          <div className="flex items-center border-b border-gray-700">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className=" outline-none flex-1 bg-transparent py-3 text-white"
            />

            <select
              name="type"
              className="outline-none bg-transparent p-5 text-white"
              onChange={(e) => handleSelection(e)}
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
        )}
        optional text for code snippets
        {type === "codeSnippet" && (
          <div className="flex items-center border-b border-gray-700">
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className=" outline-none flex-1 bg-transparent py-3 text-white"
            />
          </div>
        )}

        <div className="flex-1 ">
          {!isCommentPage && (
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                type === "text" ? "What's in your mind?" : "Enter code snippet"
              }
              className="border-none w-full bg-transparent h-full outline-none text-white "
            ></textarea>
          )}
          {isCommentPage && (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Hey ${user?.name}!! Place a comment`}
              className="border-none w-full bg-transparent h-full outline-none text-white "
            ></textarea>
          )}
        </div>
        controls
        <div className="flex items-center border-t py-1 border-gray-700">
          <div className="ml-auto space-x-3">
            <button
              disabled={loading}
              className="bg-orange-500 text-white rounded-md w-24 p-2"
            >
              {loading ? "Sending..." : "Post"}
            </button>
            <button
              disabled={loading}
              onClick={(e) => closeForm(e)}
              className="bg-red-500 text-white rounded-md w-24 p-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form> */}
    </div>
  );
}

export default ForumPostForm;
