import React from "react";
import { cn } from "@/lib/utils";
export default function Info({ background }) {
  return (
    <div
      className={cn(
        " hidden md:block w-2/5 h-fit max-h-full border bg-white/10 border-white/10 rounded-[16px] overflow-y-scroll  pb-5 hide-scrollbar md:max-w-[350px] 2xl:max-w-[467px]",
        !background && "opacity-0 pointer-events-none"
      )}
    >
      <div className='flex h-full flex-col'>
        <div className='w-full h-auto'>
          <img
            src={`https://dndai-images.s3.eu-central-1.amazonaws.com/backgrounds/${background?.name
              ?.toLowerCase()
              .replaceAll(" ", "-")}.webp`}
            alt={background?.name}
            className=' w-full object-contain '
          />
        </div>

        <div className='p-5 pb-0 flex flex-col justify-around gap-4 '>
          <span className='headline-4'>{background?.name}</span>
          <span className='text-gray2 running-text '>
            {background?.description}
          </span>
        </div>
      </div>
    </div>
  );
}
