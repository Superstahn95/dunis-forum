import React, { useEffect, Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { Transition } from "@headlessui/react";
import {
  HomeIcon,
  UserIcon,
  NewspaperIcon,
  ArrowDownTrayIcon,
  BuildingOfficeIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

function AdminLayout() {
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }
  useEffect(() => {
    handleResize();
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }
    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  const adminLinks = [
    {
      link: "Blog Posts",
      icon: <NewspaperIcon className="h-5 w-5" />,
      to: "/admin/posts",
    },
    {
      link: "Manage Users",
      icon: <UsersIcon className="h-5 w-5" />,
      to: "/admin/users",
    },
    {
      link: "Forum Posts",
      icon: <ArrowDownTrayIcon className="h-5 w-5" />,
      to: "/admin/forum-posts",
    },
    {
      link: "Create Profile",
      icon: <BuildingOfficeIcon className="h-5 w-5" />,
      to: "/admin/create-profile",
    },
    {
      link: "Manage Profile",
      icon: <UserIcon className="h-5 w-5" />,
      to: "/admin/manage-profile",
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen dark:bg-slate-900 ">
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} navigationLinks={adminLinks} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms]  ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
