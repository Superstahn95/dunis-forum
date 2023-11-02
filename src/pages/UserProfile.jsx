import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCamera, AiOutlineUser } from "react-icons/ai";
import ProfileDetails from "../components/ProfileDetails";
import ManageProfile from "../components/ManageProfile";
import ManagePassword from "../components/ManagePassword";
import ChangeImageModal from "../components/ChangeImageModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { updateUser, changePassword } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserUpdate = (data) => {
    dispatch(updateUser(data));
  };

  const handleUserPasswordChange = (data) => {
    console.log(data);
    dispatch(changePassword(data));
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  const altImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <>
      <Navbar />
      <Container>
        {/* <section className="min-h-[70vh] flex justify-center my-10">
          <div className="w-full md:w-[500px] mx-auto rounded-md shadow-lg p-4 flex flex-col items-center">
            <h2 className="font-montserrat  text-2xl  py-3 text-center">
              Edit your profile
            </h2>
            image div
            <div className="relative bg-red-400 ">
              <img
                src={user.profilePhoto ? user.profilePhoto.url : altImage}
                alt="profile picture"
                className="w-[100px] h-[100px] rounded-full"
              />
              <div className="absolute bottom-0 right-0">
                <label htmlFor="display-picture">
                  <AiFillCamera size={40} />
                </label>
                <input type="file" id="display-picture" className="hidden" />
              </div>
            </div>
            details 
            <div className="flex flex-col space-y-2 mb-4 text-gray-600 font-montserrat w-full mt-3">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                value={user.name}
                disabled
                className="border border-gray-500 outline-none p-2  rounded-md w-full"
              />
            </div>
            <div className="flex flex-col space-y-2 mb-4 text-gray-600 font-montserrat w-full mt-3">
              <label htmlFor="email">Your email</label>
              <input
                type="text"
                id="email"
                disabled
                value={user.email}
                className="border border-gray-500 outline-none p-2  rounded-md w-full"
              />
            </div>
         
          </div>
        </section> */}
        <div className="grid md:grid-cols-2 gap-8 my-10 font-montserrat">
          {/* profile */}
          <ProfileDetails user={user} setShowImageModal={setShowImageModal} />

          {/* manage profile */}
          <ManageProfile user={user} handleSubmit={handleUserUpdate} />
          {/* manage password */}
          <ManagePassword setShowPasswordModal={setShowPasswordModal} />
          {/* imageModal */}
          {showImageModal && (
            <ChangeImageModal
              setShowImageModal={setShowImageModal}
              handleSubmit={handleUserUpdate}
            />
          )}
          {showPasswordModal && (
            <ChangePasswordModal
              setShowPasswordModal={setShowPasswordModal}
              handleSubmit={handleUserPasswordChange}
            />
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default UserProfile;
