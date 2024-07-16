import React from "react";
import Tick from "@/components/ui/Icons/Tick";

export default function Card({ imgSrc, benefits, children }) {
  return (
    <div className='w-full flex flex-wrap justify-center items-center border bg-white/[8%] border-white/10 rounded-[16px] overflow-hidden'>
      <div className='w-full md:w-1/2 h-auto'>
        <img
          src={imgSrc}
          alt=''
          className='w-full  md:rounded-l-xl object-contain md:object-cover'
        />
      </div>
      <div className='w-full md:w-1/2 flex flex-col justify-start items-start  h-full'>
        <div className='p-5 pb-4 border-b border-white/[8%] md:rounded-tr-xl'>
          {children}
        </div>
        <div className=' pt-4 p-5  w-full'>
          <ul className='text-white flex flex-col gap-3 w-full'>
            {benefits.map((benefit, i) => (
              <li index={i} className='flex gap-2 justify-start items-center'>
                <Tick className='h-3.5 w-3.5 opacity-70' />
                <span className=' running-text-small '>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
