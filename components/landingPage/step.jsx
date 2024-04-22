import React from "react";

export default function Step({ number, title, description, image }) {
  return (
    <div className="flex flex-col mb-8 px-10 md:py-20 py-0 md:gap-10 gap-5">
      <div className="flex md:flex-row flex-col md:gap-10 gap-5 items-left justify-start ">
        <div className=" text-irisPurple running-text-mono text-xl">
          Step {number}
        </div>
        <div className=" mb-2 text-white running-text-mono text-xl md:w-1/4 w-full">
          {title}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 justify-end items-end">
        <div className="text-lg mb-10 md:w-2/3 w-full text-white text-justify ">
          {description}
        </div>

        <div className="md:h-[100vh] h-[50vh] bg-blur rounded-md md:w-2/3 w-full">
          <img src={image} alt={title} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
