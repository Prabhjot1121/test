import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { RxActivityLog } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { TbPremiumRights } from "react-icons/tb";

const UserProfile = () => {
  const location = useLocation();
  return (
    <>
      <div className="flex items-start justify-between w-full min-h-screen bg-gradient-to-tr from-red-100 to-blue-100 shadow-inner shadow-slate-400">
        <div className="flex w-full h-full">
          <div className="flex flex-col justify-start items-center w-[25%] p-4 border-r-2 border-slate-300 min-h-screen">
            <Link
              to="/userProfile/profile"
              className={`font-medium ${
                location.pathname === "/userProfile/profile"
                  ? "bg-white"
                  : "bg-red-700"
              } ${
                location.pathname === "/userProfile/profile"
                  ? "text-red-600"
                  : "text-white"
              } hover:text-red-600 ${
                location.pathname === "/userProfile/profile"
                  ? "hover:bg-white"
                  : "hover:bg-transparent"
              } duration-300 cursor-pointer text-sm xl:text-lg font-sans space-x-1 flex items-center mx-2 px-2 my-2 w-full justify-start h-12 shadow-sm shadow-red-900 rounded-md`}
            >
              <ImProfile size={20} />
              <span>Profile</span>
            </Link>

            <Link
              to="/userProfile/activity"
              className={`font-medium bg-red-700 ${
                location.pathname === "/userProfile/activity"
                  ? "bg-white"
                  : "bg-red-700"
              } ${
                location.pathname === "/userProfile/activity"
                  ? "text-red-600"
                  : "text-white"
              } hover:text-red-600 ${
                location.pathname === "/userProfile/activity"
                  ? "hover:bg-white"
                  : "hover:bg-transparent"
              } duration-300 cursor-pointer text-sm xl:text-lg font-sans space-x-1 flex items-center mx-2 px-2 my-2 w-full justify-start h-12 shadow-sm shadow-red-900 rounded-md`}
            >
              <RxActivityLog size={20} />
              <span>Activity</span>
            </Link>
            <Link
              to="/userProfile/settings"
              className={`font-medium bg-red-700 ${
                location.pathname === "/userProfile/settings"
                  ? "bg-white"
                  : "bg-red-700"
              } ${
                location.pathname === "/userProfile/settings"
                  ? "text-red-600"
                  : "text-white"
              } hover:text-red-600 ${
                location.pathname === "/userProfile/settings"
                  ? "hover:bg-white"
                  : "hover:bg-transparent"
              } duration-300 cursor-pointer text-sm xl:text-lg font-sans flex items-center space-x-1 mx-2 px-2 my-2 w-full justify-start h-12 shadow-sm shadow-red-900 rounded-md`}
            >
              <CiSettings size={25} />

              <span>Settings</span>
            </Link>
          </div>
          <div className="flex items-center justify-between w-full h-full p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
