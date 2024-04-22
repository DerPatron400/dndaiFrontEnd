import React from "react";

export default function Step({ number, title, description, image }) {
  return (
    <div className="flex flex-col mb-8 px-10 py-20 gap-10">
      <div className="flex gap-4 items-left justify-start ">
        <div className=" text-irisPurple running-text-mono text-xl">
          Step {number}
        </div>
        <div className=" mb-2 text-white running-text-mono text-xl w-1/4">
          {title}
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 justify-end items-end">
        <div className="text-lg mb-10 w-2/3 text-white text-justify ">
          {description}
        </div>

        <div className="h-[100vh] bg-blur rounded-md w-2/3">
          <img src={image} alt={title} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
