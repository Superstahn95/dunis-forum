import { Link } from "react-router-dom";

function PostCard({ image, category, title, body, date }) {
  return (
    <Link to={"post/id"} className="flex flex-col font-montserrat">
      <div className="mb-2">
        <img
          src="https://cdn.pixabay.com/photo/2023/10/06/02/49/flowers-8297333_1280.jpg"
          alt="post image"
        />
      </div>
      {/* post card content */}
      <div>
        {/* category */}
        <span className="text-gray-500 text-xs ">Kids coding</span>
        {/* title  */}
        <h2 className="font-semibold mt-2">
          Summer coding for kids to begin soon
        </h2>
        {/* body */}
        <p className="mb-2 text-[14px]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
          dignissimos numquam pariatur saepe necessitatibus officiis, inventore
          dolore cum laboriosam, eius delectus fugiat. Cupiditate quibusdam
          magni tempora iure beatae, ab sunt, sapiente soluta?
          Exercitationem.....
        </p>
        {/* date */}
        <span className="text-gray-500 text-xs ">Oct 10, 2023</span>
      </div>
    </Link>
  );
}

export default PostCard;
