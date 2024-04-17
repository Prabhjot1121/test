import { createContext, useState } from "react";
import toast from "react-hot-toast";
export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [savedItemsData, setSavedItemsData] = useState([]);
  const token = localStorage.getItem("token");
  const host = "http://localhost:8000/api/activity";

  const saveItem = async (venueData) => {
    if (!token) {
      toast("Please login first");
      return;
    }

    try {
      const response = await fetch(`${host}/saveItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(venueData),
      });
      console.log(venueData);
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

  const getSavedItemsData = async () => {
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
        console.log(data);
        console.log(savedItemsData);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const removeItem = async (_id) => {
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
      <ActivityContext.Provider
        value={{
          getSavedItemsData,
          savedItemsData,
          saveItem,
          token,
          host,
          removeItem,
        }}
      >
        {children}
      </ActivityContext.Provider>
    </>
  );
};
