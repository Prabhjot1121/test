import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./images/pro.png";
import ham from "./images/hamburger.png";
import Login from "./Authentication/Login";
import "./styles/Navbar.css";
import close from "../Components/images/close.png";
import SignUp from "./Authentication/SignUp";

const Navbar = () => {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [scrolling,setScrolling]=useState(false)
  const modalRef = useRef();

  // Function to open a modal
  const openModal = (modalType) => {
    if (modalType === "login") {
      setShowLoginModal(true);
    } else if (modalType === "signUp") {
      setShowSignUpModal(true);
    }
  };

  // Function to close a modal
  const closeModal = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  // Add an event listener to the overlay div
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (showLoginModal || showSignUpModal) {
      window.addEventListener("mousedown", handleClickOutside);
    } else {
      window.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLoginModal, showSignUpModal]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >4) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const textColorClass = scrolling?"text-white":"text-black"
  return (
    <>
      <nav className={`z-10 sticky top-0 navbar ${scrolling?"scrolling":""} h-24 w-full`}>
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
            {/* <Link
              style={{ fontFamily: "sans-serif" }}
              className={`font-medium text-xl hover:text-red-600 ${location.pathname === "/products"
                ? "text-red-600"
                : "text-black"
                }`}
              to="/products"
            >
              Product
            </Link> */}
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
                location.pathname === "/contact" ? "text-red-600" : textColorClass
              }`}
              to="/contact"
            >
              Contact Us
            </Link>
          </div>
          {/* buttons */}
          <div className="hidden lg:flex">
            <button
              onClick={() => openModal("login")}
              style={{ fontFamily: "sans-serif" }}
              className="bg-red-700 shadow-sm shadow-red-900 hover:bg-transparent hover:text-red-600 duration-300 ease-in-out font-medium text-white mx-2 px-4 py-2 rounded-md"
            >
              {/* <Link to="/signIn">SignIn</Link> */}
              SignIn
            </button>
            <button
              onClick={() => openModal("signUp")}
              style={{ fontFamily: "sans-serif" }}
              className="bg-red-700 shadow-sm shadow-red-900 hover:bg-transparent hover:text-red-600 duration-300 ease-in-out font-medium text-white mx-2 px-4 py-2 rounded-md"
            >
              {/* <Link to="/signUp">SignUp</Link> */}
              SignUp
            </button>
          </div>

          {/* Background Overlay */}
          {(showLoginModal || showSignUpModal) && (
            <div className="overlay" onClick={() => closeModal("all")}></div>
          )}

          {/* login modal */}
          {showLoginModal && (
            <div className="modal">
              <button
                className="absolute top-2 right-2"
                onClick={() => closeModal("login")}
              >
                {" "}
                <img className="h-8 w-8" src={close} alt="" />{" "}
              </button>
              <Login />
            </div>
          )}

          {/* signUp modal */}
          {showSignUpModal && (
            <div className="modal">
              <button
                className="absolute top-2 right-2"
                onClick={() => closeModal("login")}
              >
                {" "}
                <img className="h-8 w-8" src={close} alt="" />{" "}
              </button>
              <SignUp />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
