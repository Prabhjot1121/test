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
    <div className="h-[95%]">
      {userData.map((user) => (
        <div key={user._id} className="h-full">
          <h2 className="font-semibold text-xl underline decoration-red-600 underline-offset-2  ">
            Personal Information:
          </h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Mobile Number: {user.mobileNumber}</p>
          <p>Address: {user.address}</p>
          {/* Add more user details as needed */}
        </div>
      ))}
    </div>
  );
};
export default UserDetails;
