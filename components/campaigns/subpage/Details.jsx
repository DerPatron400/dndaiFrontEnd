import React from "react";

export default function Details({ details, setting }) {
  return (
    <div className='flex gap-[20px] w-full  details-section'>
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
        <div className='flex flex-col gap-[16px] items-start justify-start'>
          <span className='running-text-mono text-gray2'>SETTINGS</span>

          <img
            src={`https://dndai-images.s3.eu-central-1.amazonaws.com/settings/${setting
              .toLowerCase()
              .replaceAll(" ", "-")
              .replaceAll("'", "")}.webp`}
            className=' rounded-[16px] object-contain w-full'
          />
        </div>
      </div>
    </div>
  );
}
