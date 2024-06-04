import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";

const WriteReview = ({ venue }) => {
  const [reviewText, SetReviewText] = useState("");
  const inputRef = useRef(null);
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000/api/activity/saveReview";

  const handleClear = (e) => {
    inputRef.current.value = "";
  };
  const onChange = (e) => {
    SetReviewText(e.target.value);
  };
  const handleSaveReview = async (e) => {
    e.preventDefault();
    if (token) {
      const response = await fetch(`${host}`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewText, itemId: venue.itemId }),
      });
      if (!response.ok) {
        console.log(response);
        toast.error("could not post review");
        throw new Error("Failed to process this request");
      }
      const data = response.json;
      console.log(data);
      toast.success("Review Submitted!");
      handleClear();
    }else{
      toast("Please login first")
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-3 shadow-md shadow-red-200 rounded-sm p-4 w-2/3">
        {/* write review */}
        <div className="flex items-center space-x-1">
          <span className="text-lg">Write a Review</span>
          <FaPencilAlt></FaPencilAlt>
        </div>
        <form onSubmit={handleSaveReview} className="flex flex-col space-y-3">
          {/* review content */}
          <textarea
            ref={inputRef}
            name="reviewContent"
            //   value={reviewText}
            onChange={onChange}
            className="w-full rounded-sm p-2 focus:outline-red-200"
            placeholder="Type here"
          ></textarea>
          {/* buttons */}
          <div className="flex space-x-2 w-full justify-end">
            <button
              onClick={handleClear}
              className="font-medium shadow-sm shadow-red-900 px-4 py-2 bg-red-600 hover:bg-red-700 duration-300 text-white rounded-md"
            >
              Clear
            </button>
            <button
              type="submit"
              className="font-medium shadow-sm  shadow-red-900 px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WriteReview;
