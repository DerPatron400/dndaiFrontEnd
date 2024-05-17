import React from "react";
import { cn } from "@/lib/utils";
export default function Info({ background }) {
  return (
    <div
      className={cn(
        " hidden md:block w-2/5 h-full border bg-white/10 border-white/10 rounded-[16px] overflow-hidden pb-6",
        !background && "opacity-0 pointer-events-none"
      )}
    >
      <div className='flex h-full flex-col'>
        <div className='w-full h-[440px]'>
          <img
            src={`https://dndai-images.s3.eu-central-1.amazonaws.com/backgrounds/${background
              ?.toLowerCase()
              .replaceAll(" ", "-")}.webp`}
            alt={background}
            className='h-full object-cover '
          />
        </div>

        <div className='p-4 flex flex-col justify-around gap-4 '>
          <span className='headline-4'>{background}</span>
          <span className='text-gray2 running-text '>
            Astral Elves, born of the Astral Plane and rooted in the Feywild,
            radiated with divine energy, embodying a celestial essence distinct
            from their terrestrial kin.
          </span>
        </div>
      </div>
    </div>
  );
}
