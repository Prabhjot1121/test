import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { vendorsData } from "../vendorsData";
import {
  MdArrowDownward,
  MdArrowDropDown,
  MdArrowDropUp,
  MdContactPhone,
  MdEmail,
  MdLocationOn,
  MdMessage,
  MdOutlineMessage,
  MdPhone,
  MdPhotoAlbum,
  MdPhotoLibrary,
} from "react-icons/md";
import { FaPen, FaRupeeSign, FaShare } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

const VendorDetailsPage = () => {
  const [priceInfo, setPriceInfo] = useState("hidden");
  const [isVisible, setIsVisible] = useState(false);
  const { category, name } = useParams();
  const venueName = name.replace(/-/g, " ");
  const [venue, setVenue] = useState(null);

  const toggleComponent = (id) => {
    if (id===2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const togglePricingInfo = () => {
    if (priceInfo === "hidden") {
      setPriceInfo("flex");
    } else {
      setPriceInfo("hidden");
    }
  };
  const findVenue = () => {
    // Iterate over each location in vendorsData
    for (const location in vendorsData) {
      const venues = vendorsData[location][category]; // Access the  'category'
      // Iterate over each subCategory in the 'venues' object
      for (const subCategory in venues) {
        const venuesArray = venues[subCategory];
        // Find the venue with a name that matches the provided venueName
        const foundVenue = venuesArray.find(
          (v) => v.name.toLowerCase() === venueName.toLowerCase() // Ensure case-insensitive comparison
        );
        if (foundVenue) {
          setVenue(foundVenue);
          console.log(foundVenue);
          console.log(venue); // Log the found venue
          return;
        }
      }
    }
    // If no venue is found, set venue to null and log a message
    setVenue(null);
    console.log("Venue not found:", venueName);
  };

  useEffect(() => {
    findVenue();
    // eslint-disable-next-line
  }, [venueName]);
  return (
    <>
      <>
        <div
          style={{ fontFamily: "sans-serif" }}
          className="h-[160vh] py-12 w-full bg-gradient-to-tr from-red-100 to-blue-100 shadow-inner shadow-slate-400"
        >
          <div className="flex justify-between h-full w-[85%] rounded-sm mx-auto">
            {venue && (
              <>
                <div className="flex flex-col">
                  <div className="flex justify-center relative h-[76.5vh] w-fit">
                    <img
                      className="rounded-sm h-[400px] shadow-sm shadow-black w-[700px]"
                      src={`/vendorsDataImages/${venue.image}`}
                      alt=""
                    />
                    <div className="absolute bottom-0 rounded-sm space-y-4 flex flex-col justify-start w-[95%] shadow-sm shadow-slate-900 h-52 bg-white">
                      <div className="flex w-full h-full justify-between p-4">
                        <div className="flex flex-col space-y-2 items-start justify-start ">
                          <span className="font-medium text-xl">
                            {venue.name}
                          </span>
                          <div className="flex space-x-2">
                            <MdLocationOn size={25} />
                            <span className="text-slate-500">
                              {venue.location.charAt(0).toUpperCase() +
                                venue.location.slice(1)}
                            </span>
                          </div>
                          <div className="flex text-slate-400 text-xs space-x-1">
                            <span>{venue.name}</span>
                            <span className="">
                              {venue.location.charAt(0).toUpperCase() +
                                venue.location.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center text-green-700 space-x-2 hover:text-green-600 cursor-pointer">
                            <MdPhone color="green" />
                            <span>Contact</span>
                          </div>
                        </div>
                        <div>{venue.rating}</div>
                      </div>
                      <div className="flex items-center justify-between w-full h-16 bg-gray-50">
                        <div className="flex items-center text-slate-500 hover:text-red-600 cursor-pointer space-x-1 w-full justify-center  border-r-[1px] border-slate-500">
                          <MdPhotoLibrary />
                          <span className="">Photos</span>
                        </div>
                        <div className="flex items-center text-slate-500 hover:text-red-600 cursor-pointer space-x-1 w-full justify-center  border-r-[1px] border-slate-500">
                          <IoMdHeart />
                          <span className="">Shortlist</span>
                        </div>
                        <div className="flex items-center text-slate-500 hover:text-red-600 cursor-pointer space-x-1 w-full justify-center  border-r-[1px] border-slate-500">
                          <FaPen />
                          <span className="">Write a Review</span>
                        </div>
                        <div className="flex items-center text-slate-500 hover:text-red-600 cursor-pointer space-x-1 w-full justify-center ">
                          <FaShare />
                          <span className="">Share</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-6 w-[450px]">
                  <div className="flex flex-col w-full items-center shadow-sm shadow-slate-600 bg-white">
                    <div className="flex justify-between items-center w-full px-4 border-b-gray-200 border-[1px] h-12">
                      <span>Starting Price</span>
                      <div
                        onClick={togglePricingInfo}
                        className="flex items-center cursor-pointer"
                      >
                        <span className="text-red-600">Pricing Info</span>
                        {priceInfo === "hidden" ? (
                          <MdArrowDropDown color="red" size={25} />
                        ) : (
                          <MdArrowDropUp color="red" size={25} />
                        )}
                      </div>
                    </div>
                    <div
                      className={`${priceInfo} items-center w-full px-4 justify-between border-b-[1px] border-gray-200 h-20`}
                    >
                      <div className="flex flex-col items-start space-y-1 justify-center">
                        <span className="text-sm font-medium">
                          Starting price of room
                        </span>
                        <div className="text-gray-400 flex items-center">
                          <FaRupeeSign />
                          <span>4500 per room</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start space-y-1 justify-center">
                        <span className="text-sm font-medium">
                          Starting Price of Decor
                        </span>
                        <div className="text-gray-400 flex items-center">
                          <FaRupeeSign />
                          <span>50,000</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-full justify-between px-4 border-b-[1px] border-gray-200 h-16">
                      <div className="flex items-center h-full">
                        <FaRupeeSign color="red" />
                        <div className="flex items-center ">
                          <div className="text-lg text-red-600 font-medium">
                            {venue.foodCategory?.vegPlatePrice}{" "}
                            <span className="text-base"> per plate </span>
                          </div>
                          &nbsp;
                          <span className="text-gray-400">(taxes extra )</span>
                        </div>
                      </div>
                      <span className="text-gray-600 text-sm">Veg price</span>
                    </div>
                    <div className="flex items-center w-full justify-between px-4 border-b-[1px] border-gray-200 h-16">
                      <div className="flex items-center h-full">
                        <FaRupeeSign color="red" />
                        <div className="flex items-center ">
                          <div className="text-lg text-red-600 font-medium">
                            {venue.foodCategory?.nonVegPlatePrice}{" "}
                            <span className="text-base"> per plate </span>
                          </div>
                          &nbsp;
                          <span className="text-gray-400 ">(taxes extra )</span>
                        </div>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Non - Veg price
                      </span>
                    </div>
                  </div>
                  <div className="h-[60vh] bg-transparent w-full shadow-sm shadow-slate-600">
                    <div className="flex text-lg items-center justify-around h-fit border-b-black border-[1px]">
                      <button onClick={()=>toggleComponent(1)} className={`flex items-center space-x-1 px-4 py-2 hover:text-red-500 w-full h-16 bg-white shadow-sm shadow-red-900 ${!isVisible?"text-red-500":"text-gray-500"} ${!isVisible?"cursor-default":"cursor-pointer"} `}>
                        <MdEmail />
                        <span>Send Message</span>
                      </button>
                      <hr />
                      <button onClick={()=>toggleComponent(2)} className={`flex items-center space-x-1 px-4 py-2 hover:text-red-500 w-full h-16 bg-white shadow-sm shadow-red-900 ${!isVisible?"text-gray-500":"text-red-500"} ${!isVisible?"cursor-pointer":"cursor-default"}`}>
                        <MdPhone />
                        <span>View Contact</span>
                      </button>
                    </div>
                    <div className="h-[51vh] bg-white">
                      {!isVisible?<div>message</div>:<div>contact</div>}
                    </div>
                  </div>
                  <div></div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    </>
  );
};
export default VendorDetailsPage;
