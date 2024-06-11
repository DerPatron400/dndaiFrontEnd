import React from "react";
import { cn } from "@/lib/utils";

export default function Info({ _class }) {
  return (
    <div
      className={cn(
        "hidden md:block w-2/5 h-full border bg-white/10 border-white/10 rounded-[16px] overflow-y-scroll pb-6 hide-scrollbar  md:max-h-[652px] md:max-w-[467px]",
        !_class && "opacity-0 pointer-events-none"
      )}
    >
      <div className='flex h-full flex-col w-full'>
        <div className='w-full h-[440px]'>
          <img
            src={`https://dndai-images.s3.eu-central-1.amazonaws.com/class/${_class?.name
              ?.toLowerCase()
              .replaceAll(" ", "-")}.webp`}
            alt={_class?.name}
            className='h-full w-full object-cover '
          />
        </div>

        <div className='p-4 flex flex-col justify-around gap-4 '>
          <span className='headline-4'>{_class?.name}</span>
          <span className='text-gray2 running-text '>
            {_class?.description}
          </span>
        </div>
      </div>
    </div>
  );
}
