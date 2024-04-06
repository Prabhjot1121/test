import React, { useContext, useEffect } from "react";
import data from "../vendorsData.json";
import { useParams } from "react-router-dom";
import { LocationContext } from "../Context/Location_context/LocationContext";
import { AuthContext } from "../Context/Authentication_context/AuthContext";

const DisplayVendorsData = () => {
  const { location } = useContext(LocationContext);
  const { userData, getUserData } = useContext(AuthContext);
  const { category, subCategory } = useParams();
  const vendorData =
    location === "all-cities" ? data["all-cities"] : data[location];

  const handleGetUserData = async () => {
    getUserData();
    console.log(userData);
  };
  useEffect(() => {
    handleGetUserData();
  }, [location]);
  return (
    <>
      <div className="shadow-inner shadow-slate-600 flex items-center justify-center h-[80vh] w-full">
        <div className="flex items-center justify-center border-[1px] border-black h-[70vh] w-[95%] space-x-5">
          <div>hello my location is {location}</div>
          <div>user Data</div>
          {userData.map((user) => (
            <li>{user.name}</li>
          ))}
          {location === "jaipur" ? (
            <div>all wedding venues</div>
          ) : (
            <>{subCategory ? <div>{category}{subCategory}</div> : <div>{category}</div>}</>
          )}
        </div>
        {vendorData.map((venue) => (
          <>
            <li key={venue.id}>{venue.name}</li>
          </>
        ))}
      </div>
    </>
  );
};

export default DisplayVendorsData;
