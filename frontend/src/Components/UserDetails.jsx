import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";

const UserDetails = () => {
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000";
  const [userData, setUserData] = useState([]);
  const [editUserData, setEditUserData] = useState(true);
  const ref = useRef();

  const handleEditUserData = (e) => {
    e.preventDefault();
    if (!editUserData) {
      setEditUserData(true);
      console.log(editUserData);
    } else {
      setEditUserData(false);
      console.log(editUserData);
    }
  };

  const handleGetUserData = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getUserData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("failed to fetch user data");
      }
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data.user)) {
        setUserData(data.user);
      } else {
        setUserData([data.user]); // Convert single object to array
      }
      toast.success("user data fetched");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    handleGetUserData();
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="h-full w-full">
      {userData.map((user) => (
        <div key={user._id} className="my-2 p-2 rounded-md h-full w-full">
          <div className="flex items-center w-full justify-between text-3xl font-semibold">
            <span className="flex items-center">
              <h2 className="underline decoration-red-600 underline-offset-2  ">
                Personal Information
              </h2>
              &gt;
            </span>
            <FaUserEdit
              onClick={handleEditUserData}
              className="cursor-pointer"
              style={{ color: "#dc2626" }}
            />
          </div>
          <div className="grid row-auto w-full gap-5 mt-6 grid-cols-2">
            <div className="flex flex-col justify-start w-full">
              <label
                htmlFor="name"
                className="text-lg font-medium cursor-pointer"
              >
                Name:
              </label>{" "}
              {editUserData ? (
                <span className="border-[1px] border-black bg-transparent text-black px-4 text-base rounded-md py-2">
                  {user.name}
                </span>
              ) : (
                <input
                  type="text"
                  placeholder="Name"
                  id="name"
                  className="border-[1px] border-black bg-transparent text-black focus:outline-red-600 px-4 text-base rounded-md shadow-md shadow-blue-200 py-2"
                />
              )}
            </div>
            <div className="flex flex-col justify-start w-full">
              <label
                htmlFor="email"
                className="text-lg font-medium cursor-pointer"
              >
                Email:{" "}
              </label>
              {editUserData ? (
                <span className="border-[1px] border-black bg-transparent text-black px-4 text-base rounded-md py-2">
                  {user.email}
                </span>
              ) : (
                <input
                  type="email"
                  placeholder="Email address"
                  id="email"
                  className="border-[1px] border-black bg-transparent text-black focus:outline-red-600 px-4 text-base rounded-md shadow-md shadow-blue-200 py-2"
                />
              )}
            </div>
            <div className="flex flex-col justify-start w-full">
              <label
                htmlFor="mobileNumber"
                className="text-lg font-medium cursor-pointer"
              >
                Mobile Number:{" "}
              </label>
              {editUserData ? (
                <span className="border-[1px] border-black bg-transparent text-black px-4 text-base rounded-md py-2">
                  {user.mobileNumber}
                </span>
              ) : (
                <input
                  type="phone"
                  placeholder="Mobile number"
                  id="mobileNumber"
                  className="border-[1px] border-black bg-transparent text-black focus:outline-red-600 px-4 text-base rounded-md shadow-md shadow-blue-200 py-2"
                />
              )}
            </div>
            <div className="flex flex-col justify-start w-full">
              <label
                htmlFor="address"
                className="text-lg font-medium cursor-pointer"
              >
                Address:{" "}
              </label>
              {editUserData ? (
                <span className="border-[1px] border-black bg-transparent text-black px-4 text-base rounded-md py-2">
                  {user.address}
                </span>
              ) : (
                <input
                  type="text"
                  placeholder="Address"
                  id="address"
                  className="border-[1px] border-black bg-transparent text-black focus:outline-red-600 px-4 text-base rounded-md shadow-md shadow-blue-200 py-2"
                />
              )}
            </div>
          </div>
          {/* Add more user details as needed */}
          {!editUserData && (
            <div className="flex justify-end mt-20 w-[100%]">
              <button className="flex px-4 py-2 shadow-sm shadow-red-900 text-white bg-red-700 rounded-md mx-2 font-medium">
                Cancel
              </button>
              {
                <button
                  onClick={() => {
                    setEditUserData(true);
                  }}
                  className="flex px-4 py-2 shadow-sm shadow-red-900 text-white bg-red-700 rounded-md mx-2 font-medium"
                >
                  Submit
                </button>
              }
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default UserDetails;
