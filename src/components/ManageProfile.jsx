import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import FeatureLoader from "./FeatureLoader";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../utils/toastify";
import { reset } from "../features/auth/authSlice";

function ManageProfile({ user, handleSubmit }) {
  const dispatch = useDispatch();
  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );

  const [userDetails, setUserDetails] = useState({
    name: user?.name,
    email: user?.email,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleDetailsEdit = (e) => {
    e.preventDefault();
    handleSubmit(userDetails);
  };
  useEffect(() => {
    if (isError) {
      toast.error(message, toastifyConfig);
    }
    if (isSuccess) {
      toast.success(message, toastifyConfig);
    }
    dispatch(reset());
  }, [isSuccess, isError, message, dispatch]);
  return (
    <div className="w-full  mx-auto rounded-md shadow-lg p-4 ">
      <div className="flex items-center mb-7 space-x-7">
        <div className="bg-green-700 rounded-full p-3">
          <MdDashboard size={40} color="white" />
        </div>
        <p className="font-bold text-2xl">Manage Profile</p>
      </div>
      <form onSubmit={handleDetailsEdit}>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="border border-gray-500/40 outline-none p-2  rounded-md"
            value={userDetails?.name}
          />
        </div>
        <div className="mb-3 flex flex-col space-y-2">
          <label htmlFor="name">Email</label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            className="border border-gray-500/40 outline-none p-2  rounded-md"
            value={userDetails?.email}
          />
        </div>
        {/* save change button */}
        <div className="mb-3">
          <button
            type="submit"
            className="bg-orange-500 text-white px-3 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
      {isLoading && <FeatureLoader text="Updating  details" />}
      <ToastContainer />
    </div>
  );
}

export default ManageProfile;
