import React from "react";
import img from "./images/about.avif";

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-tr from-red-100 h-full flex flex-col justify-center items-center to-blue-100 pb-20">
        <div className="flex flex-col items-center justify-center mt-20 ">
          <span
            className="mb-12 text-5xl font-semibold underline-offset-4 underline decoration-red-600"
            style={{ fontFamily: "sans-serif" }}
          >
            About
          </span>
          <div className="w-[80%] mx-auto flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-10 border-0 border-black">
            <div className="w-full">
              <img
                className="shadow-xl shadow-red-200 rounded m-auto h-96 w-96"
                src={img}
                alt=""
              />
            </div>
            <div className="w-full tracking-wide text-xl font-sans">
              We're your trusted partner in creating extraordinary moments. Our
              passion lies in delivering top-notch event management services
              that turn your dreams into unforgettable realities. With a deep
              commitment to reliability, flexibility, and transparent
              communication, we offer a seamless experience for every occasion.
              Whether you're planning a grand wedding, a corporate event, or a
              private celebration, our dedicated team ensures that every detail
              is meticulously executed. Connect with us today to explore our
              services, get in touch with skilled professionals, or hire our
              expert event planners. Let's collaborate and make your next event
              truly special.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
