import React, { useContext} from "react";
import { LocationContext } from "../Context/Location_context/LocationContext";

const Location = () => {
  const { location, setLocation } = useContext(LocationContext);

  const onChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    localStorage.setItem("location", newLocation);
  };

  return (
    <>
      <div className="w-fit h-fit">
        <div className="flex items-center">
          <label className="font-semibold" htmlFor="location">
            Location:
          </label>
          <select
            id="location"
            name="location"
            value={location}
            onChange={onChange}
            className="w-60 appearance-none px-4 py-2 rounded-sm mx-2 focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Cities</option>
            <option value="delhi">Delhi</option>
            <option value="jaipur">Jaipur</option>
            <option value="udaipur">Udaipur</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Location;
