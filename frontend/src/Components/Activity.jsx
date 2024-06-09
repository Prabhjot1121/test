import React, { useState } from "react";
import UserAssociatedReviews from "./UserAssociatedReviews";
import ShortlistedItems from "./ShortlistedItems";
import { FaHeart } from "react-icons/fa";

const Activity = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleComponent = (id) => {
    if (id === 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <>
      <div className="w-full space-y-6 min-h-[83vh] m-2">
        <div className="flex text-lg items-center justify-start h-fit w-full shadow-md shadow-blue-200 p-1 rounded-md">
          <button
            onClick={() => toggleComponent(1)}
            className={`flex items-center space-x-1 px-4 py-2 w-fit h-10 border-red-600 border-r-2  bg-inherit duration-300 rounded-tl-md ${
              !isVisible ? "text-red-600" : "text-gray-500"
            } ${!isVisible ? "cursor-default" : "cursor-pointer"} `}
          >
            <div className="flex items-center">
              <FaHeart color="red"></FaHeart>
              <span> Items</span>
            </div>
          </button>
          <hr />
          <button
            onClick={() => toggleComponent(2)}
            className={`flex items-center space-x-1 px-4 py-2 w-fit h-10 border-red-600  bg-inherit duration-300 rounded-tr-md
                          ${!isVisible ? "text-gray-500" : "text-red-500"} ${
              !isVisible ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <span>Reviews</span>
          </button>
        </div>

        {!isVisible ? <ShortlistedItems /> : <UserAssociatedReviews />}
      </div>
    </>
  );
};

export default Activity;
