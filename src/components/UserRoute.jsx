import UserProfile from "../pages/UserProfile";
import { Routes, Route } from "react-router-dom";

function UserRoute() {
  return (
    <Routes>
      {" "}
      <Route path="/" element={<UserProfile />} />{" "}
    </Routes>
  );
}

export default UserRoute;
