import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserProfile = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full h-[90vh] bg-gradient-to-tr from-red-100 to-blue-100 shadow-inner shadow-slate-400">
        <div className="flex w-full h-full">
          <div className="flex flex-col justify-start items-center w-[25%] p-4 border-r-2 border-slate-300">
            <Link
              to="/userProfile/dashboard"
              className="font-medium bg-red-700 text-white hover:text-red-600 hover:bg-transparent duration-300 cursor-pointer text-lg font-sans flex items-center mx-2 px-2 my-2 w-full justify-start h-12 shadow-sm shadow-red-900 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              to="/userProfile/dashboard"
              className="font-medium bg-red-700 text-white hover:text-red-600 hover:bg-transparent duration-300 cursor-pointer text-lg font-sans flex items-center mx-2 px-2 my-2 w-full justify-start h-12 shadow-sm shadow-red-900 rounded-md"
            >
              Personal Information
            </Link>
            <Link
              to="/dashboard"
              className="font-medium bg-red-700 text-white hover:text-red-600 hover:bg-transparent duration-300 cursor-pointer text-lg font-sans flex items-center mx-2 px-2 my-2 w-full justify-start h-12 shadow-sm shadow-red-900 rounded-md"
            >
              Account Settings
            </Link>
            <Link
              to="/dashboard"
              className="font-medium bg-red-700 text-white hover:text-red-600 hover:bg-transparent duration-300 cursor-pointer text-lg font-sans flex items-center mx-2 px-2 my-2 w-full justify-start h-12 shadow-sm shadow-red-900 rounded-md"
            >
              Support
            </Link>
            <Link
              to="/dashboard"
              className="font-medium bg-red-700 text-white hover:text-red-600 hover:bg-transparent duration-300 cursor-pointer text-lg font-sans flex items-center mx-2 px-2 my-2 w-full justify-start h-12 shadow-sm shadow-red-900 rounded-md"
            >
              Check Out Premium Plans
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
