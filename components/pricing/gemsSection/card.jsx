import React from "react";
import Tick from "@/components/ui/Icons/Tick";

export default function Card({ imgSrc, info }) {
  return (
    <div className="w-full flex justify-center items-center border border-white/10 rounded-xl">
      <div className="w-1/2">
        <img
          src={imgSrc}
          alt=""
          className="w-[345px] h-[450px] rounded-l-xl object-cover"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-start items-start  h-full">
        <div className="p-4 border border-white/[8%] rounded-tr-xl">
          <span dangerouslySetInnerHTML={{ __html: info }} />
        </div>
        <div className=" p-4 w-full">
          <ul className="text-white flex flex-col gap-2 w-full">
            <li className="flex gap-2 justify-start items-center">
              <Tick />
              <span className="text-white running-text-small ">
                Over 4 hours of playtime
              </span>
            </li>
            <li className="flex gap-2 justify-start items-center">
              <Tick />
              <span className="text-white running-text-small ">
                Over 4 hours of playtime
              </span>
            </li>
            <li className="flex gap-2 justify-start items-center">
              <Tick />
              <span className="text-white running-text-small ">
                Over 4 hours of playtime
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
