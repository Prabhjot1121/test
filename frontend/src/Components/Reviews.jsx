import React, { useState } from "react";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState("");
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000/api/activity/getAllReviews";

  const handleGetReviews = async () => {
    const response = await fetch(`${host}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Could not get reviews data");
    }
    const data = await response.json();
    console.log(data);
  };
  return <div></div>;
};

export default Reviews;
