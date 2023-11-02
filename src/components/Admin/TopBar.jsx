import { Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function TopBar({ showNav, setShowNav }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const altImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className={`fixed bg-gray-200 z-[90] w-full h-16 flex justify-between items-center transition-all duruation-[400ms] ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16 flex justify-between items-center w-full ">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer dark:text-white"
          onClick={() => setShowNav(!showNav)}
        />
        <div className="flex space-x-1  items-center pr-4 md:pr-16">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center">
                <div>
                  <img
                    src={user?.profilePhoto ? user?.profilePhoto.url : altImage}
                    className="w-8 h-8 rounded-full md:mr-4 border-2 border-white shadow-sm"
                    alt=""
                  />
                </div>
                <span className="hidden md:block font-medium text-gray-700">
                  {user.name.split(" ")[0]}
                </span>
                <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
                <div className="p-1">
                  <Menu.Item>
                    <Link
                      to={"/"}
                      className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Go to Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={handleLogout}
                      className=" w-full flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <CreditCardIcon className="h-4 w-4 mr-2" />
                      Log out
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
