import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="w-full h-screen bg-green-700 flex justify-center font-montserrat">
      <div className="flex flex-col items-center mt-14 space-y-7">
        <h2 className="text-white font-bold text-3xl">Page Not Found</h2>
        <Link to={"/"} className="underline text-white">
          Go back to home page
        </Link>
      </div>
    </div>
  );
}

export default Page404;
