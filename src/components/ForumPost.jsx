import { Link } from "react-router-dom";
import { BiSolidTrashAlt, BiMessageAltMinus } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";

function ForumPost() {
  return (
    <Link
      to={"/forum/id"}
      className=" bg-green-700 flex flex-col rounded-md min-h-[200px] font-montserrat mb-7 p-4 cursor-pointer hover:bg-green-600 transition duration-500 ease-in-out"
    >
      {/* name and delete details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
            className="w-10 h-10"
          />
          <span className="text-gray-300 text-sm font-bold">
            Stanley Chukwuemeka
          </span>
        </div>
        {/* date of post */}
        <span className="text-gray-300 text-sm">10/10/2023</span>
      </div>
      <p className="text-gray-200">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet harum
        dolores commodi laudantium molestiae, illum debitis illo cumque quaerat
        atque est exercitationem perspiciatis quae fugit error hic ipsa.
        Recusandae porro dolorem enim similique consequatur, sequi laudantium
        officia neque praesentium optio fuga nemo doloremque, aliquid harum
        fugiat ab quo aut tempore......
      </p>
      <div className="flex items-center mt-auto">
        <span className="text-gray-200 text-xs">10 comments</span>
      </div>
    </Link>
  );
}

export default ForumPost;
