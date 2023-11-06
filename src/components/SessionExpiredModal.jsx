import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { setSessionExpired } from "../features/session/sessionSlice";

function SessionExpiredModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(setSessionExpired(false));
    navigate("/login");
  };
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/60 flex items-center justify-center z-[1999]">
      <div className="bg-white w-[90%] md:w-[500px] rounded-md font-montserrat p-4 flex flex-col items-center space-y-4 relative">
        <h2 className="font-bold text-lg md:text-2xl">OOPS!!😬 </h2>
        <p className=" text-sm text-center md:text-xl">Session Expired</p>
        <p className="text-sm md:text-lg">Log out and sign in again</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-2 rounded-md text-sm "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SessionExpiredModal;
