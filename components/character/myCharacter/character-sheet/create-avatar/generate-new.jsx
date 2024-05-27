import React from "react";
import { IMAGE_STYLES } from "./constants";

export default function GenerateNew() {
  return (
    <div className={"flex gap-5 flex-col items-start p-6 pt-4 !pb-0"}>
      <div className='flex flex-col gap-3'>
        <span className='text-white running-text-large '>
          Generate new portrait
        </span>
        <span className='running-text text-gray2'>
          Select an art style you want to use
        </span>
      </div>
      <div className='grid grid-cols-12 w-full gap-5 min-h-96   max-h-[60vh] h-full overflow-scroll hide-scrollbar  pb-24'>
        {IMAGE_STYLES.map((avatar, index) => (
          <div
            key={index}
            className='col-span-4 gap-3 text-white flex flex-col'
            onClick={() => {
              console.log("avatar clicked", avatar);
            }}
          >
            <img
              src={`https://dndai-images.s3.eu-central-1.amazonaws.com/art-styles/${avatar
                .toLowerCase()
                .replaceAll(" ", "-")}.webp`}
              alt='avatar'
              className='w-full h-[253px] rounded-[16px]'
            />
            <span className='uppercase running-text-mono'>{avatar}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
