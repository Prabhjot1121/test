import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    return localStorage.getItem("location") || "all";
  });

  useEffect(() => {
    localStorage.setItem("location", location);
  },[location]);

  return (
    <>
      <LocationContext.Provider value={{ location, setLocation }}>
        {children}
      </LocationContext.Provider>
    </>
  );
};
