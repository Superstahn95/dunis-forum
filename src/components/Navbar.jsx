import { NavLink } from "react-router-dom";
import Container from "./Container";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { user, isSuccess, isLoading, isError, message, isAuthenticated } =
    useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="bg-green-700  py-4 font-montserrat">
      <Container>
        <div className="flex items-center justify-between">
          <NavLink to={"/"} className="text-sm md:text-xl text-white font-bold">
            DunisTech
          </NavLink>
          {/* authentication and dashboard links */}
          <div className="flex items-center space-x-1 md:space-x-3">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 cursor-pointer text-xs md:text-lg hover:text-orange-500"
                      : "text-white cursor-pointer text-xs md:text-lg hover:text-orange-500 "
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to={"/register"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 cursor-pointer text-xs md:text-lg hover:text-orange-500"
                      : "text-white cursor-pointer text-xs md:text-lg hover:text-orange-500"
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to={"/forum"}
                  //   className="text-white cursor-pointer hover:text-orange-500 "
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 cursor-pointer text-xs md:text-lg hover:text-orange-500"
                      : "text-white cursor-pointer text-xs md:text-lg hover:text-orange-500"
                  }
                >
                  Forum
                </NavLink>
              </>
            ) : (
              // to be modified
              <>
                {" "}
                <NavLink
                  to={"/forum"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-500 cursor-pointer text-xs md:text-lg hover:text-orange-500"
                      : "text-white cursor-pointer text-xs md:text-lg hover:text-orange-500"
                  }
                >
                  Forum
                </NavLink>
                {user.role === "admin" || user.role === "juniorAdmin" ? (
                  <NavLink
                    to="/admin/posts"
                    className="text-white cursor-pointer text-xs md:text-lg hover:text-orange-500"
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "text-orange-500 cursor-pointer text-xs md:text-lg hover:text-orange-500"
                        : "text-white cursor-pointer text-xs md:text-lg hover:text-orange-500"
                    }
                  >
                    Profile
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 text-white text-xs md:text-lg rounded-md p-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
