import React from "react";

const Vendors = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[90vh] bg-gradient-to-tr from-red-100 to-blue-100 w-full">
        <div className="flex flex-row text-3xl justify-start h-fit items-center w-3/4 mt-10">
          <span className="text-3xl underline underline-offset-[4.5px] decoration-red-600 font-semibold">
            Browse Serivces
          </span>
          &gt;
        </div>
        <div className="flex justify-between items-center h-[80%] w-3/4 space-x-12">
          <div className="flex flex-col justify-center items-start h-[80%] w-[70%] border-[1px] border-black shadow-lg shadow-red-300 rounded-md">
            Order Materials
          </div>
          <div className="flex flex-col justify-center items-start h-[80%] w-[70%] border-[1px] border-black shadow-lg shadow-red-300 rounded-md">
            Order Materials
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendors;
