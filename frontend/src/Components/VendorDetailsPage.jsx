import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { vendorsData } from "../vendorsData";
import { MdEmail, MdLocationOn, MdPhone, MdPhotoLibrary } from "react-icons/md";
import { FaPen, FaShare } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import WriteReview from "./WriteReview";
import { ActivityContext } from "../Context/Activity_context/ActivityContext";
import Reviews from "../Components/Reviews";

const VendorDetailsPage = () => {
  const { token, venue, setVenue } = useContext(ActivityContext);
  const host = "http://localhost:8000";
  const [reviewsData, setReviewsData] = useState("");
  const [priceInfo, setPriceInfo] = useState("hidden");
  const [messageSent, setMessageSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { category, name, subCategory, location } = useParams();
  const venueName = name.replace(/-/g, " ");
  // const [venue, setVenue] = useState(null);
  const [enquiryFormData, setEnquiryFormData] = useState({
    venueName: "",
    venueLocation: "",
    fullName: "",
    contactNumber: "",
    emailAddress: "",
    functionDate: "",
    totalGuests: "",
    totalRooms: "",
    functionType: "",
    functionTime: "",
  });
  const [venueAvailable, setVenueAvailable] = useState(false);

  const toggleComponent = (id) => {
    if (id === 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
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

  const onChange = (e) => {
    setEnquiryFormData({ ...enquiryFormData, [e.target.name]: e.target.value });
  };

  const handleEnquiryByUser = async (e) => {
    e.preventDefault();
    try {
      setMessageSent(false);
      const response = await fetch(`${host}/api/notify/send-sms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryFormData),
      });
      if (!response.ok) {
        throw new Error("Failed to provide availablity details right now");
      }
      console.log(enquiryFormData);
      toast.success(
        "Sent availablity details on provided mobile number and available"
      );
      setVenueAvailable(true);
      setEnquiryFormData({
        fullName: "",
        contactNumber: "",
        emailAddress: "",
        functionDate: "",
        totalGuests: "",
        totalRooms: "",
        functionTime: "",
        functionType: "",
      });
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setMessageSent(false);
    }
  };

  const handleVendorDetails = async () => {
    const response = await fetch(`${host}/api/notify/send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSaveItem = async () => {
    if (!token) {
      toast("Please login first");
      return;
    }

    if (!venue) {
      toast.error("Data is not available to process this request");
      return;
    }

    try {
      const response = await fetch(`${host}/api/activity/saveItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(venue),
      });
      console.log(venue);
      if (!response.ok) {
        throw new Error("Failed to process the request");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Data saved successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleBookVenueNow = async () => {
    if (venueAvailable) {
    }
  };

  const handleGetReviews = async () => {
    if (venue && venue.itemid) {
      const response = await fetch(
        `${host}/api/activity/getAllReviews/${venue.itemId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Could not get reviews data");
      }
      const data = await response.json();
      console.log(data);
      setReviewsData(data);
    } else {
      console.log("didn't get venue and itemId");
    }
  };

  return (
    <>
      <div
        style={{ fontFamily: "sans-serif" }}
        className="space-y-20 h-full py-12 w-full bg-gradient-to-tr from-red-100 to-blue-100 shadow-inner shadow-slate-400"
      >
        <div className="flex flex-col lg:flex-row justify-between h-full w-[94%] rounded-sm mx-auto">
          {venue && (
            <>
              {/* item photo and content */}
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
                      <button
                        onClick={handleSaveItem}
                        className="flex items-center text-slate-500 hover:text-red-600 cursor-pointer space-x-1 w-full justify-center  border-r-[1px] border-slate-500"
                      >
                        <IoMdHeart />
                        <span className="">Shortlist</span>
                      </button>
                      <div className="flex items-center text-slate-500 hover:text-red-600 cursor-pointer space-x-1 w-full justify-center ">
                        <FaShare />
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(window.location.href)
                          }
                        >
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* contact components */}
              <div className="flex flex-col space-y-6 w-[560px]">
                <div className="h-fit bg-transparent w-full">
                  <div className="flex text-lg items-center justify-around h-fit w-full">
                    <button
                      onClick={() => toggleComponent(1)}
                      className={`flex items-center space-x-1 px-4 py-2 w-full h-16 border-red-600 border-r-2 ${
                        isVisible ? "border-b-2" : "border-b-0"
                      } bg-white duration-300 rounded-tl-md ${
                        !isVisible ? "text-red-600" : "text-gray-500"
                      } ${!isVisible ? "cursor-default" : "cursor-pointer"} `}
                    >
                      <MdEmail />
                      <span>Check Availablity</span>
                    </button>
                    <hr />
                    <button
                      onClick={() => toggleComponent(2)}
                      className={`flex items-center space-x-1 px-4 py-2 w-full h-16 border-red-600 ${
                        isVisible ? "border-b-0" : "border-b-2"
                      } bg-white duration-300 rounded-tr-md
                          ${!isVisible ? "text-gray-500" : "text-red-500"} ${
                        !isVisible ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <MdPhone />
                      <span>Book Now</span>
                    </button>
                  </div>
                  <div className="h-fit bg-white rounded-b-md">
                    {!isVisible ? (
                      <div className="h-full w-full space-y-4 flex flex-col p-4">
                        <span>Hi {venue.name},</span>
                        <form
                          onSubmit={handleEnquiryByUser}
                          // method="post"
                          className="flex flex-col space-y-6 w-full"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                            <div className="w-full mx-auto text-center my-4">
                              <input
                                type="text"
                                name="fullName"
                                onChange={onChange}
                                value={enquiryFormData.fullName}
                                className="w-full py-2 focus:outline-none cursor-pointer focus:cursor-default focus:border-b-2 hover:border-black border-b-[1px] border-gray-500 focus:border-red-600"
                                required
                                placeholder="Full name"
                              />
                            </div>
                            <div className="w-full mx-auto text-center my-4">
                              <input
                                type="phone"
                                name="contactNumber"
                                onChange={onChange}
                                value={enquiryFormData.contactNumber}
                                className="w-full py-2 focus:outline-none cursor-pointer focus:cursor-default focus:border-b-2 hover:border-black border-b-[1px] border-gray-500 focus:border-red-600"
                                required
                                minLength={10}
                                maxLength={10}
                                placeholder="Contact number"
                              />
                            </div>
                            <div className="w-full mx-auto text-center my-4">
                              <input
                                type="email"
                                name="emailAddress"
                                onChange={onChange}
                                value={enquiryFormData.emailAddress}
                                className="w-full py-2 focus:outline-none cursor-pointer focus:cursor-default focus:border-b-2 hover:border-black border-b-[1px] border-gray-500 focus:border-red-600"
                                required
                                placeholder="Email"
                              />
                            </div>
                            <div className="w-full mx-auto text-center my-4">
                              <input
                                type="date"
                                name="functionDate"
                                onChange={onChange}
                                value={enquiryFormData.functionDate}
                                className="w-full py-2 focus:outline-none cursor-pointer focus:cursor-default focus:border-b-2 hover:border-black border-b-[1px] border-gray-500 focus:border-red-600 appearance-none"
                                placeholder="Function date"
                                min={(() => {
                                  const today = new Date();
                                  today.setDate(today.getDate() + 1); // Add one day to today's date
                                  return today.toISOString().split("T")[0]; // Set min attribute to tomorrow's date
                                })()}
                              />
                            </div>
                            {!category === "photographers" && (
                              <div className="w-full mx-auto text-center my-4">
                                <input
                                  type="number"
                                  name="totalGuests"
                                  onChange={onChange}
                                  value={enquiryFormData.totalGuests}
                                  className="w-full py-2 focus:outline-none cursor-pointer focus:cursor-default focus:border-b-2 hover:border-black border-b-[1px] border-gray-500 focus:border-red-600"
                                  placeholder="No of guests(min: 50)"
                                />
                              </div>
                            )}
                            {!category === "photographers" && (
                              <div className="w-full mx-auto text-center my-4">
                                <input
                                  type="number"
                                  name="totalRooms"
                                  onChange={onChange}
                                  value={enquiryFormData.totalRooms}
                                  className="w-full py-2 focus:outline-none cursor-pointer focus:cursor-default focus:border-b-2 hover:border-black border-b-[1px] border-gray-500 focus:border-red-600"
                                  placeholder="No of rooms"
                                />
                              </div>
                            )}
                            <div className="flex flex-col text-sm space-y-2">
                              <span className="text-lg font-medium">
                                Function Type
                              </span>
                              <div className="grid grid-cols-2 w-full gap-2">
                                <div className="space-x-1">
                                  <input
                                    type="radio"
                                    className="cursor-pointer"
                                    name="functionType"
                                    value="preWedding"
                                    checked={
                                      enquiryFormData.functionType ===
                                      "preWedding"
                                    }
                                    onChange={onChange}
                                    id="functionType"
                                  />
                                  <label htmlFor="wedding">Pre Wedding</label>
                                </div>
                                <div className="space-x-1">
                                  <input
                                    type="radio"
                                    className="cursor-pointer"
                                    name="functionType"
                                    value="wedding"
                                    checked={
                                      enquiryFormData.functionType === "wedding"
                                    }
                                    onChange={onChange}
                                    id="functionType"
                                  />
                                  <label htmlFor="wedding">wedding</label>
                                </div>
                                <div className="space-x-1">
                                  <input
                                    type="radio"
                                    className="cursor-pointer"
                                    name="functionType"
                                    value="party"
                                    checked={
                                      enquiryFormData.functionType === "party"
                                    }
                                    onChange={onChange}
                                    id="functionType"
                                  />
                                  <label htmlFor="party">Party</label>
                                </div>
                                <div className="space-x-1">
                                  <input
                                    type="radio"
                                    className="cursor-pointer"
                                    name="functionType"
                                    value="farewell"
                                    checked={
                                      enquiryFormData.functionType ===
                                      "farewell"
                                    }
                                    onChange={onChange}
                                    id="functionType"
                                  />
                                  <label htmlFor="wedding">farewell</label>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col text-sm space-y-2">
                              <span className="text-lg font-medium">
                                Function Time
                              </span>
                              <div className="flex justify-between">
                                <div className="space-x-1">
                                  <input
                                    type="radio"
                                    className="cursor-pointer"
                                    name="functionTime"
                                    value="evening"
                                    onChange={onChange}
                                    checked={
                                      enquiryFormData.functionTime === "evening"
                                    }
                                    id="functionTime"
                                  />
                                  <label htmlFor="time">Evening</label>
                                </div>
                                <div className="space-x-1">
                                  <input
                                    type="radio"
                                    className="cursor-pointer"
                                    name="functionTime"
                                    onChange={onChange}
                                    value="day"
                                    checked={
                                      enquiryFormData.functionTime === "day"
                                    }
                                    id="functionTime"
                                  />
                                  <label htmlFor="day">Day</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            disabled={messageSent}
                            className="w-full bg-red-600 hover:bg-red-700 duration-300 text-white px-4 py-4 rounded-md"
                          >
                            <span>Check Availability & Prices</span>
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-start w-full p-4">
                        <span className="font-medium">
                          Verify the mobile number to contact the vendor
                        </span>
                        <form
                          onSubmit={handleVendorDetails}
                          method="post"
                          className="w-full flex flex-col mb-2"
                        >
                          <div className="flex space-x-4 mt-2 w-full jusitfy-around">
                            <input
                              className="border-gray-400 focus:outline-none focus:placeholder:text-red-200 border-b-[1px]  hover:border-black h-8"
                              type="text"
                              placeholder="Full name"
                            />
                            <input
                              className="border-gray-400 focus:outline-none focus:placeholder:text-red-200 border-b-[1px]  hover:border-black h-8"
                              type="phone"
                              placeholder="Mobile number"
                            />
                          </div>
                          <div className="flex flex-col w-full">
                            <div className="flex space-x-1 mt-3 items-center">
                              <input type="checkbox" />
                              <span>Text me vendors details</span>
                            </div>
                            <button
                              type="submit"
                              className="mt-4 bg-red-600 text-white hover:bg-red-700 py-3 rounded-md text-xl duration-300"
                            >
                              Verify
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
                <div></div>
              </div>
            </>
          )}
        </div>
        {/* review */}
        <div className="flex flex-col justify-between h-full w-[94%] mx-auto">
          <WriteReview
            venue={venue}
            handleGetReviews={handleGetReviews}
            reviewsData={reviewsData}
          />
          <Reviews />
        </div>
      </div>
    </>
  );
};
export default VendorDetailsPage;
