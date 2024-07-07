import React from "react";
import Card from "./card";

export default function index() {
  return (
    <div className="z-10  w-full h-full flex flex-col md:gap-12 gap-10 md:flex-col text-white justify-center items-center mt-16">
      <span className="text-center w-3/4 hidden md:block text-white headline-3 z-[10] ">
        Our
        <span className="text-irisPurpleLight">credit packages</span> at a
        glance.{" "}
      </span>
      <div className=" w-3/4 grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
}
