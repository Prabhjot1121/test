import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const host = "http://localhost:8000";
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handlePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else {
      setPasswordType("text");
    }
  };

  const handleSignUp = async (e) => {
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      confirmPassword,
      address,
    } = credentials;
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await fetch(`${host}/api/auth/createUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: firstName + " " + lastName,
            mobileNumber,
            email,
            password,
            address,
          }),
        });
        if (!response.ok) {
          throw new Error("failed to create user");
        }
        const data = await response.json();
        console.log(data);
        navigate("/home");
        localStorage.setItem("token", data.authToken);
        toast.success("Account Created Successfully!");
      } catch (error) {
        console.error(error.message);
      }
    } else {
      toast.error("Both password must be same");
    }
  };

  return (
    <>
      <div
        style={{ fontFamily: "sans-serif" }}
        className="flex justify-center items-center mx-auto w-full  bg-gradient-to-tr from-red-100 to-blue-100 h-[90vh]"
      >
        <div className="flex items-center flex-col h-fit w-1/2">
          <span className="font-semibold text-3xl">Create Account</span>
          <form
            onSubmit={handleSignUp}
            className="flex flex-col space-y-6 my-10 items-start w-full"
            method="post"
          >
            <div className="flex space-x-6 w-full">
              <div className="flex flex-col w-1/2">
                <label className="w-fit cursor-pointer" htmlFor="first name">
                  First Name:
                </label>
                <div className="flex justify-between w-full focus:shadow-red-200 border-2 border-slate-600 shadow-md shadow-blue-200 rounded-md">
                  <input
                    className="w-full text-lg focus:outline-none placeholder:text-sm bg-transparent py-1 px-2"
                    type="name"
                    value={credentials.firstName}
                    onChange={onChange}
                    name="firstName"
                    id="first name"
                    required
                    placeholder="First name"
                  />
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <label className="w-fit cursor-pointer" htmlFor="last name">
                  Last Name:
                </label>
                <div className="flex justify-between w-full focus:shadow-red-200 border-2 border-slate-600 shadow-md shadow-blue-200 rounded-md">
                  <input
                    className="w-full text-lg focus:outline-none placeholder:text-sm bg-transparent py-1 px-2"
                    type="name"
                    value={credentials.lastName}
                    onChange={onChange}
                    name="lastName"
                    id="last name"
                    required
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-6 w-full">
              <div className="flex flex-col w-1/2">
                <label className="w-fit cursor-pointer" htmlFor="mobile number">
                  Mobile Number:
                </label>
                <div className="flex justify-between w-full focus:shadow-red-200 border-2 border-slate-600 shadow-md shadow-blue-200 rounded-md">
                  <input
                    className="w-full text-lg focus:outline-none placeholder:text-sm bg-transparent py-1 px-2"
                    type="phone"
                    value={credentials.mobileNumber}
                    onChange={onChange}
                    name="mobileNumber"
                    id="mobile number"
                    minLength={10}
                    maxLength={10}
                    required
                    placeholder="Mobile number"
                  />
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <label className="w-fit cursor-pointer" htmlFor="email">
                  Email Address:
                </label>
                <div className="flex justify-between w-full focus:shadow-red-200 border-2 border-slate-600 shadow-md shadow-blue-200 rounded-md">
                  <input
                    className="w-full text-lg focus:outline-none placeholder:text-sm bg-transparent py-1 px-2"
                    type="email"
                    value={credentials.email}
                    onChange={onChange}
                    name="email"
                    required
                    id="email"
                    placeholder="Email address"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-6 w-full">
              <div className="flex flex-col w-1/2">
                <label className="w-fit cursor-pointer" htmlFor="setPassword">
                  Set Password
                </label>
                <div className="relative flex justify-between items-center w-full focus:shadow-red-200 border-2 border-slate-600 shadow-md shadow-blue-200 rounded-md">
                  <input
                    className="w-full text-lg focus:outline-none placeholder:text-sm  bg-transparent py-1 px-2"
                    type={passwordType}
                    value={credentials.password}
                    onChange={onChange}
                    name="password"
                    id="setPassword"
                    required
                    placeholder="Password must contain atleast 8 characters"
                  />
                  <span className="absolute right-2 px-2">
                    <FaEye
                      className="cursor-pointer"
                      onClick={handlePasswordType}
                    ></FaEye>
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  className="w-fit cursor-pointer"
                  htmlFor="confirmPassword"
                >
                  Confirm Password:
                </label>
                <div className="flex justify-between w-full focus:shadow-red-200 border-2 border-slate-600 shadow-md shadow-blue-200 rounded-md">
                  <input
                    className="w-full text-lg focus:outline-none placeholder:text-sm  bg-transparent py-1 px-2"
                    type="password"
                    value={credentials.confirmPassword}
                    onChange={onChange}
                    name="confirmPassword"
                    id="confirmPassword"
                    required
                    placeholder="Password must be same"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center w-full ">
              <label className="w-fit cursor-pointer" htmlFor="address">
                Address:
              </label>
              <input
                type="text"
                value={credentials.address}
                onChange={onChange}
                name="address"
                id="address"
                required
                cols="30"
                rows="10"
                placeholder="Write your address "
                className="placeholder:text-sm focus:outline-none shadow-md shadow-blue-200 border-2 border-slate-600 rounded-md w-full px-4 py-2 bg-transparent"
              ></input>
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="flex items-center justify-between shadow-sm shadow-red-900 px-4 py-3 bg-red-700 text-white rounded-md font-medium w-1/3"
              >
                Create Account
                <FaArrowRight
                  size={20}
                  className="animate-pulse"
                ></FaArrowRight>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
