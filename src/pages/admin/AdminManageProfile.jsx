import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileDetails from "../../components/ProfileDetails";
import ManageProfile from "../../components/ManageProfile";
import ManagePassword from "../../components/ManagePassword";
import ChangeImageModal from "../../components/ChangeImageModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import { updateUser, changePassword } from "../../features/auth/authSlice";

function AdminManageProfile() {
  // to fix=> double toast component shooting whenever i change admin details
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleUserUpdate = (data) => {
    dispatch(updateUser(data));
  };

  const handleUserPasswordChange = (data) => {
    dispatch(changePassword(data));
  };

  const altImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <>
      {/* <Container> */}
      <div className="grid md:grid-cols-2 gap-8  my-10 font-montserrat">
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
      {/* </Container> */}
    </>
  );
}

export default AdminManageProfile;
