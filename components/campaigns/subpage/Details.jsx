import React from "react";

export default function Details({ details }) {
  return (
    <div className='flex gap-[20px] w-full border details-section'>
      <div className='w-1/2 flex flex-col gap-[16px]'>
        <div className=' flex flex-col gap-[16px]'>
          <span className='running-text-mono text-gray2'>TIME</span>
          <p className='running-text'>{details.time}</p>
        </div>
        <div className=' flex flex-col gap-[16px]'>
          <span className='running-text-mono text-gray2'>PLOT</span>
          <p className='running-text'>{details.plot}</p>
        </div>
        <div className=' flex flex-col gap-[16px]'>
          <span className='running-text-mono text-gray2'>HOOK</span>
          <p className='running-text'>{details.hook}</p>
        </div>
      </div>
      <div className='w-1/2'>
        {" "}
        <div className='flex flex-col gap-[16px]'>
          <span className='running-text-mono text-gray2'>SETTING</span>
          <div className='bg-white/[8%] rounded-[16px] w-full h-[446px]'></div>
        </div>
      </div>
    </div>
  );
}
