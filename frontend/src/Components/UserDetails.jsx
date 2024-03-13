import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserDetails = () => {
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000";
  const [userData, setUserData] = useState([]);

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
          <div className="flex items-center text-3xl font-semibold">
            <h2 className="underline decoration-red-600 underline-offset-2  ">
              Personal Information
            </h2>
            &gt;
          </div>
          <div className="grid row-auto w-full gap-5 mt-6 grid-cols-2">
            <div className="flex flex-col justify-start w-full">
              <label htmlFor="" className="text-lg font-medium cursor-pointer">
                Name:
              </label>{" "}
              <span className="bg-gray-600 text-white px-4 text-base rounded-sm py-2">
                {user.name}
              </span>
            </div>
            <div className="flex flex-col justify-start w-full">
              <label htmlFor="" className="text-lg font-medium cursor-pointer">
                Email:{" "}
              </label>
              <span className="bg-gray-600 text-white px-4 text-base rounded-sm py-2">
                {user.email}
              </span>
            </div>
            <div className="flex flex-col justify-start w-full">
              <label htmlFor="" className="text-lg font-medium cursor-pointer">
                Mobile Number:{" "}
              </label>
              <span className="bg-gray-600 text-white px-4 text-base rounded-sm py-2">
                {user.mobileNumber}
              </span>
            </div>
            <div className="flex flex-col justify-start w-full">
              <label htmlFor="" className="text-lg font-medium cursor-pointer">
                Address:{" "}
              </label>
              <span className="bg-gray-600 text-white px-4 text-base rounded-sm py-2">
                {user.address}
              </span>
            </div>
          </div>
          {/* Add more user details as needed */}
        </div>
      ))}
    </div>
  );
};
export default UserDetails;
