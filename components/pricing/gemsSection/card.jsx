import React from "react";
import Tick from "@/components/ui/Icons/Tick";

export default function Card({ imgSrc, children }) {
  return (
    <div className='w-full flex justify-center items-center border border-white/10 rounded-[16px] overflow-hidden'>
      <div className='w-1/2'>
        <img
          src={imgSrc}
          alt=''
          className='w-[345px] h-[450px] rounded-l-xl object-cover'
        />
      </div>
      <div className='w-1/2 flex flex-col justify-start items-start  h-full'>
        <div className='p-5 pb-4 border border-white/[8%] rounded-tr-xl'>
          {children}
        </div>
        <div className=' pt-4 p-5  w-full'>
          <ul className='text-white flex flex-col gap-3 w-full'>
            <li className='flex gap-2 justify-start items-center'>
              <Tick className='h-3.5 w-3.5 opacity-70' />
              <span className=' running-text-small '>
                Over 4 hours of playtime
              </span>
            </li>
            <li className='flex gap-2 justify-start items-center'>
              <Tick className='h-3.5 w-3.5 opacity-70' />
              <span className=' running-text-small '>
                Over 4 hours of playtime
              </span>
            </li>
            <li className='flex gap-2 justify-start items-center'>
              <Tick className='h-3.5 w-3.5 opacity-70' />
              <span className=' running-text-small '>
                Over 4 hours of playtime
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
