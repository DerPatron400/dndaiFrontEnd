import React from "react";
import ImageComponent from "./ImageComponent";

const Images = () => {
  return (
    <div className="w-[70vw] border border-[#393a3b] mx-auto mt-10 mb-10 p-8 h-auto text-white rounded-md shadow-lg font-sans">
      <ImageComponent />
      <ImageComponent />
      <ImageComponent />
    </div>
  );
};

export default Images;
