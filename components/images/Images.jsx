import React from "react";
import ImageComponent from "./ImageComponent";

const Images = () => {
  return (
    <div className="relative w-full sm:w-[70vw] border border-[#393a3b] mx-auto my-[5%] h-auto text-white rounded-md shadow-lg font-sans">
      <div className="relative">
        <img
          src="/dice2.jpg"
          alt="Header Image Alt Text"
          className="w-full h-[30vh] object-cover mb-4 rounded-md"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>

        {/* Heading */}
        <h1 className="text-[2rem] text-center sm:text-[3rem] font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="text-green-500">DnDAI </span>Images
        </h1>
      </div>
      <div className="flex flex-wrap justify-center mb-10">
        <ImageComponent />
        <ImageComponent />
        <ImageComponent />
        <ImageComponent />
      </div>
    </div>
  );
};

export default Images;
