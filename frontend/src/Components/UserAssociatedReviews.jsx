import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { ActivityContext } from "../Context/Activity_context/ActivityContext";

const UserAssociatedReviews = () => {
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000/api/activity";
  const [fetchedUserReviewsData, setFetchedUserReviewsData] = useState([]);
  const { formatTime } = useContext(ActivityContext);

  // fetch all reviews associated with a userId
  const handleFetchAllReviews = async () => {
    if (!token) {
      toast.error("No authentication token found.");
      return;
    }

    try {
      const response = await fetch(`${host}/fetchAllReviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        console.log("Response status:", response.status);
        console.log("Response message:", response.statusText);
        toast.error("Could not fetch all reviews right now");
        return;
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setFetchedUserReviewsData(data);
      } else {
        toast.error("Fetched data is not an array");
        console.log("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("An error occurred while fetching reviews.");
    }
  };

  useEffect(() => {
    handleFetchAllReviews();
    // eslint-disable-next-line
  }, [token]);

  //   handle delete particular review
  const handleDeleteReviewWithId = async (_id) => {
    if (!token) {
      toast.error("No authentication token found.");
      return;
    }
    
    const response = await fetch(`${host}/deleteReview/${_id}`, {
      method: "DELETE",
      headers: {
        "auth-token": token,
      },
    });
    if (response.ok) {
      toast.error("could not delete review");
    }
    const data = await response.json();
    console.log(data);
    toast.success("Review deleted!");
  };

  return (
    <div>
      <span>Reviews you have posted till now</span>
      <button onClick={handleFetchAllReviews}>Reviews</button>
      <div className="flex flex-col space-y-2">
        {Array.isArray(fetchedUserReviewsData) &&
        fetchedUserReviewsData.length > 0 ? (
          fetchedUserReviewsData.map((userReviews) => (
            <div key={userReviews._id} className="w-full ">
              <div className="w-2/3 space-y-2 py-2 px-4 shadow-sm bg-red-50 shadow-red-200 rounded-md">
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <FaUser size={20}></FaUser>
                    <span className="font-semibold text-red-700">
                      {userReviews.userId.name}
                    </span>
                  </div>
                  <button onClick={handleDeleteReviewWithId(userReviews._id)}>
                    Delete
                  </button>
                </div>
                <p className="font-thin tracking-tight">
                  {userReviews.reviewText}
                </p>
                <span className="pt-2 text-red-600">
                  {formatTime(userReviews.createdAt)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default UserAssociatedReviews;
