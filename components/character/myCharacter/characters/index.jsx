import React from "react";
import Card from "./card";

export default function characters({ characters }) {
  return (
    <div className='h-full min-h-screen w-screen px-[48px] py-[128px] '>
      <div className=' flex flex-col gap-[20px] justify-start'>
        <span className='headline-3 '>
          My characters
          <span className='text-gray2 ms-4 font-roboto-mono transform translate-up text-[24px]'>
            ({characters.length})
          </span>
        </span>
        <div className=' w-full grid grid-cols-12 gap-[20px]'>
          {characters.map((_, index) => (
            <Card character={_} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
