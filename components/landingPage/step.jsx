import React from "react";

export default function Step({ number, title, description, image }) {
  return (
    <div className="flex flex-col mb-8 md:px-10 px-4 md:!py-32 py-0 md:gap-10 gap-5">
      <div className="flex md:flex-row flex-col md:gap-10 gap-5 items-left justify-start border">
        <span className=" uppercase text-irisPurpleLight running-text-mono">
          Step {number}
        </span>
        <span className=" mb-2 text-white headline-4 md:w-52 w-full">
          {title}
        </span>
      </div>
      <div className="w-full flex md:flex-col flex-col-reverse md:gap-[100px] gap-5 justify-end items-end">
        <div className="  md:w-2/3 w-full text-white md:text-justify md:running-text-large running-text ">
          {description}
        </div>

        <div className="md:h-[100vh] h-[50vh] bg-blur rounded-2xl md:w-2/3 w-full">
          <div src={image} alt={title} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
