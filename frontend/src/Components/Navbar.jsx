import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ham from "../images/hamburger.png";
import "../styles/Navbar.css";
import { RxPerson } from "react-icons/rx";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 4) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast("User logged out!");
  };

  const textColorClass = scrolling ? "text-white" : "text-black";
  return (
    <>
      <nav
        className={`z-10 sticky top-0 navbar ${
          scrolling ? "scrolling" : ""
        } h-24 w-full`}
      >
        <div className="relative flex justify-between w-[95%] mx-auto items-center h-full">
          {/* logo */}
          <div className="mx-2 flex justify-between w-[100%] lg:w-fit">
            <Link to="/">
              <div className="relative animate-pulse rounded-full h-16 w-16 bg-gradient-to-r flex items-center justify-center from-red-400 to-blue-400">
                <span
                  style={{ fontFamily: "sans-serif" }}
                  className="absolute text-base p-4 text-center font-bold text-tranparent bg-gradient-to-r from-red-300 to-blue-300 bg-clip-text"
                >
                  UTSAV
                </span>
              </div>
            </Link>
            <div className="flex lg:hidden">
              <img className="h-16 w-16" src={ham} alt="" />
            </div>
          </div>
          {/* navlinks */}
          <div className="hidden h-10 lg:flex items-end space-x-6 w-[100%] md:w-fit">
            <Link
              style={{ fontFamily: "sans-serif" }}
              className={`font-medium text-xl hover:text-red-600 ${
                location.pathname === "/" ? "text-red-600" : textColorClass
              }`}
              to="/"
            >
              Home
            </Link>
            <Link
              style={{ fontFamily: "sans-serif" }}
              className={`font-medium text-xl hover:text-red-600 ${
                location.pathname === "/products"
                  ? "text-red-600"
                  : textColorClass
              }`}
              to="/products"
            >
              Product
            </Link>
            <Link
              style={{ fontFamily: "sans-serif" }}
              className={`font-medium text-xl hover:text-red-600 ${
                location.pathname === "/services"
                  ? "text-red-600"
                  : textColorClass
              }`}
              to="/services"
            >
              Services
            </Link>
            <Link
              style={{ fontFamily: "sans-serif" }}
              className={`font-medium text-xl hover:text-red-600 ${
                location.pathname === "/features"
                  ? "text-red-600"
                  : textColorClass
              }`}
              to="/features"
            >
              Features
            </Link>
            <Link
              style={{ fontFamily: "sans-serif" }}
              className={`font-medium text-xl hover:text-red-600 ${
                location.pathname === "/about" ? "text-red-600" : textColorClass
              }`}
              to="/about"
            >
              About Us
            </Link>
            <Link
              style={{ fontFamily: "sans-serif" }}
              className={`font-medium text-xl hover:text-red-600 ${
                location.pathname === "/contact"
                  ? "text-red-600"
                  : textColorClass
              }`}
              to="/contact"
            >
              Contact Us
            </Link>
          </div>
          {/* buttons */}
          {!token ? (
            <div className="hidden lg:flex">
              <Link
                to="/logIn"
                style={{ fontFamily: "sans-serif" }}
                className="bg-red-700 shadow-sm shadow-red-900 hover:bg-transparent hover:text-red-600 duration-300 ease-in-out font-medium text-white mx-2 px-4 py-2 rounded-md"
              >
                LogIn
              </Link>
              <Link
                to="/signUp"
                style={{ fontFamily: "sans-serif" }}
                className="bg-red-700 shadow-sm shadow-red-900 hover:bg-transparent hover:text-red-600 duration-300 ease-in-out font-medium text-white mx-2 px-4 py-2 rounded-md"
              >
                SignUp
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/userProfile/dashboard" className="cursor-pointer">
                <RxPerson color="#345566" size={35} />
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-700 shadow-sm shadow-red-900 hover:bg-transparent hover:text-red-600 duration-300 ease-in-out font-medium text-white mx-2 px-4 py-2 rounded-md"
              >
                SignOut
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
