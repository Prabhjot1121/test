import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Authentication_context/AuthContext";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { MdLocationPin, MdStar } from "react-icons/md";
import { FaCircle, FaCross } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdSad } from "react-icons/io";

const Activity = (props) => {
  const [savedItemsData, setSavedItemsData] = useState([]);
  const { token } = useContext(AuthContext);
  const host = "http://localhost:8000/api/activity";
  const { location, category, subCategory } = props;

  const handleGetSavedItemsData = async () => {
    if (token) {
      try {
        const response = await fetch(`${host}/getSavedItems`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setSavedItemsData(data);
        toast.success("Shortlisted items data!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    handleGetSavedItemsData();
  }, []);

  const handleRemoveItem = async (_id) => {
    if (token) {
      try {
        const response = await fetch(`${host}/removeItem/${_id}`, {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        });
        if (!response.ok) {
          throw new Error("Can't process the request right now");
        }
        toast.success("Item removed successfully");
        setSavedItemsData(savedItemsData.filter((item) => item._id !== _id));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <div className="w-full space-y-6 min-h-[83vh] mx-2">
        <div className="flex items-end w-full justify-between">
          <span className="my-4 text-3xl font-medium underline-offset-8 underline decoration-red-600">
            Shortlisted Items
          </span>
          <div className="flex items-center mb-4 space-x-2 bg-red-700 shadow-sm shadow-red-900 rounded-md font-medium text-white px-4 py-2">
            <span className="">Total: </span>
            <span className="">{savedItemsData.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 row-auto w-full mx-auto">
          {savedItemsData.length !== 0 ? (
            savedItemsData.map((item) => {
              return (
                <>
                  <div
                    className="flex flex-col justify-center items-start rounded-md p-3 cursor-pointer bg-opacity-250 hover:bg-white hover:scale-105 duration-300 shadow-xl shadow-red-50 space-y-3"
                    key={item.id}
                  >
                    <div className="relative w-fit h-fit">
                      <img
                        className="h-[200px] w-[320px] rounded-md"
                        src={`/vendorsDataImages/${item.image}`}
                        alt=""
                      />
                      <RxCrossCircled
                        onClick={() => {
                          handleRemoveItem(item._id);
                        }}
                        className="absolute top-1 right-1 rounded-full"
                        color="orange"
                        size={25}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-sm">{item.name}</span>
                        <div className="flex items-center space-x-1">
                          <MdStar color="orange" /> <span>{item.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MdLocationPin />
                        <span>
                          {item.location.charAt(0).toUpperCase() +
                            item.location.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="flex items-center w-full text-lg text-start">
              No data available right now{" "}
              <IoMdSad className="mx-2" color="red" size={25} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Activity;
