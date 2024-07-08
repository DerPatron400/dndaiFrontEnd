import React from "react";
import CustomButton from "@/components/ui/custom-button";
import Tick from "@/components/ui/Icons/Tick";

export default function cards() {
  return (
    <div className='border border-white/10 w-full bg-white/[8%] rounded-[16px]'>
      <div className='p-5 pb-4 flex flex-col gap-2'>
        <h1 className='text-gray2 running-text-mono'>ADVENTURER</h1>
        <h2 className='text-white headline-4 flex justify-start items-end gap-2'>
          9,99€ <span className='text-gray2 running-text-mono'> /month</span>
        </h2>
      </div>
      <div className='p-4  px-5 border-y border-white/10'>
        <ul className='text-white flex flex-col gap-3'>
          <li className='flex gap-2 justify-start items-center'>
            <img src='/gems/Legendary.png' alt='' className='w-4 h-4' />
            <span className='text-white running-text-mono'>10</span>
          </li>
          <li className='flex gap-2 justify-start items-center'>
            <img src='/gems/Mythic.png' alt='' className='w-4 h-4' />
            <span className='text-white running-text-mono'>10</span>
          </li>
        </ul>
      </div>
      <div className='p-4 px-5 flex flex-col gap-4'>
        <ul className='text-white flex flex-col gap-3'>
          <li className='flex gap-2 justify-start items-center'>
            <Tick className='h-3.5 w-3.5 opacity-70' />
            <span className='text-white running-text-small '>
              Over 4 hours of playtime{" "}
              <span className='text-gray2 '> / month</span>
            </span>
          </li>
          <li className='flex gap-2 justify-start items-center'>
            <Tick className='h-3.5 w-3.5 opacity-70' />
            <span className='text-white running-text-small '>
              Over 4 hours of playtime
            </span>
          </li>
          <li className='flex gap-2 justify-start items-center'>
            <Tick className='h-3.5 w-3.5 opacity-70' />
            <span className='text-white running-text-small '>
              Over 4 hours of playtime
            </span>
          </li>
        </ul>
      </div>

      <div className='pb-5 px-5'>
        <CustomButton variant={"primary"} className={"w-full"}>
          Subscribe now
        </CustomButton>
      </div>
    </div>
  );
}
