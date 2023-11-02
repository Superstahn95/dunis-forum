import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import toastifyConfig from "../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/auth/authSlice";
import { useEffect } from "react";

function ChangePasswordModal({ setShowPasswordModal, handleSubmit }) {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswordDetails({
      ...passwordDetails,
      [name]: value,
    });
  };
  const changePassword = (e) => {
    e.preventDefault();
    for (const key in passwordDetails) {
      if (passwordDetails[key] === "") {
        toast.error("Fill all fields", toastifyConfig);
        return;
      }
    }
    handleSubmit(passwordDetails);
  };
  useEffect(() => {
    if (isError) {
      toast.error(message, toastifyConfig);
    }
    if (isSuccess) {
      toast.success(message, toastifyConfig);
    }
    dispatch(reset());
  }, [isError, message, isSuccess]);
  console.log(isError, message, isSuccess);
  return (
    <div className="fixed z-[100] w-full h-full top-0 left-0 bg-black/40 font-montserrat  flex justify-center ">
      <div className="bg-white h-fit w-[90%]  sm:w-[500px]  p-4 rounded-md mt-10 ">
        <div className="border-b border-gray-400 flex items-center justify-between">
          <h2 className="text-gray-700 text-xl pb-2 font-bold dark:text-white">
            Change Password
          </h2>
          <div
            onClick={() => setShowPasswordModal(false)}
            className="h-8 w-8 rounded-full flex items-center justify-center border cursor-pointer border-gray-700 dark:border-white"
          >
            <XMarkIcon className="h-5 w-5 text-gray-700" />
          </div>
        </div>
        {/* file upload field */}
        <form onSubmit={changePassword}>
          <div className="my-3 flex flex-col space-y-2 ">
            <label htmlFor="old-password">Old Password</label>
            <input
              type="password"
              id="old-password"
              name="oldPassword"
              value={passwordDetails.oldPassword}
              onChange={handleChange}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md"
            />
          </div>
          <div className="mb-3 flex flex-col space-y-2 ">
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              name="newPassword"
              value={passwordDetails.newPassword}
              onChange={handleChange}
              type="password"
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md"
            />
          </div>
          <div className="mb-3 flex flex-col space-y-2 ">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              value={passwordDetails.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              type="password"
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md"
            />
          </div>
          <div className="">
            <div className="ml-auto w-fit space-x-3">
              <button
                role="button"
                onClick={() => setShowPasswordModal(false)}
                className="bg-red-500 text-white px-3 py-2 rounded-md"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-green-700 text-white px-3 py-2 rounded-md"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChangePasswordModal;
