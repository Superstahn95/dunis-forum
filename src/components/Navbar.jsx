import { NavLink } from "react-router-dom";
import Container from "./Container";

function Navbar() {
  return (
    <nav className="bg-green-700  py-4 font-montserrat">
      <Container>
        <div className="flex items-center justify-between">
          <NavLink to={"/"} className="text-xl text-white font-bold">
            DunisTech
          </NavLink>
          {/* authentication and dashboard links */}
          <div className="flex items-center space-x-3">
            <NavLink to={"/login"} className="text-white cursor-pointer ">
              Login
            </NavLink>
            <NavLink to={"/register"} className="text-white cursor-pointer ">
              Register
            </NavLink>
            <NavLink to={"/forum"} className="text-white cursor-pointer ">
              Forum
            </NavLink>
            <NavLink to={"/dashboard"} className="text-white cursor-pointer ">
              Dashboard
            </NavLink>
            <button className="bg-orange-500 text-white rounded-md p-2">
              Logout
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
