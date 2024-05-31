import React from "react";

export default function Step({ number, title, description, image }) {
  return (
    <div className='flex flex-col  mb-16 md:mb-8  md:!py-32 py-0 md:gap-10  gap-5'>
      <div className='flex md:flex-row flex-col md:gap-10 gap-4 items-left justify-start '>
        <span className=' uppercase text-irisPurpleLight running-text-mono z-10'>
          Step {number}
        </span>
        <span className='mb-2 text-white headline-2 md:headline-4 md:w-52 w-full z-10'>
          {title}
        </span>
      </div>
      <div className='w-full flex md:flex-col flex-col-reverse md:gap-[100px] gap-8 justify-end items-end'>
        <div className='  md:w-2/3 w-full text-white md:text-left md:running-text-large running-text z-10 '>
          {description}
        </div>

        <div className='h-full bg-blur rounded-2xl md:w-2/3 w-full'>
          {/* Render the image using an img tag */}
          <img src={image} alt={title} className='w-full  object-contain' />
        </div>
      </div>
    </div>
  );
}
