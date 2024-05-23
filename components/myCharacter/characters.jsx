import React from "react";
import Card from "./card";

export default function characters() {
  return (
    <div className="h-full min-h-screen w-screen px-[48px] py-[128px] ">
      <div className=" flex flex-col gap-[20px] justify-start">
        <span className="headline-3 ">
          My characters
          <span className="text-gray2 transform translate-up text-[30px]">
            ( 3 )
          </span>
        </span>
        <div className=" w-full flex flex-wrap gap-[20px]">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
