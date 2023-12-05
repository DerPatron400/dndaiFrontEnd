import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
//aos
import AOS from "aos";
import "aos/dist/aos.css";

const SaveGame = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="relative border border-[#393a3b] rounded-md shadow-lg w-full sm:w-[70vw] mx-auto my-[5%] text-white overflow-hidden">
      {/* Header Section */}
      <div className="relative flex flex-col items-center">
        <img
          src="/dice2.jpg"
          alt="Header Image Alt Text"
          className="w-full h-[30vh] object-cover mb-4 rounded-md"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>

        <h1 className="text-[2rem] sm:text-[3rem] text-center font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          Your Quest Awaits, <span className="text-green-500">UserName</span>!
        </h1>
      </div>

      <div>
        <div className="bg-black p-4 sm:p-8">
          <div
            data-aos="fade-right"
            className="mb-4 border-l-4 border-green-500 pl-4"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              Character Name:
            </h2>
            <p>Your Character's Name</p>
          </div>

          <div
            data-aos="fade-right"
            className="mb-4 border-l-4 border-green-500 pl-4"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              Character Class:
            </h2>
            <p>Your Character's Class</p>
          </div>

          <div
            data-aos="fade-right"
            className="mb-4 border-l-4 border-green-500 pl-4"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              Character Level:
            </h2>
            <p>Your Character's Level</p>
          </div>

          {/* Add more saved information sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default SaveGame;
