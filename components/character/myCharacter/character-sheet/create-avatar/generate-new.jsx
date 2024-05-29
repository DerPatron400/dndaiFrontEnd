import React, { useState } from "react";
import { IMAGE_STYLES } from "./constants";
import { cn } from "@/lib/utils";

export default function GenerateNew({ style, setStyle }) {
  return (
    <div className='grid grid-cols-12 w-full gap-5 min-h-96  max-h-[80vh] md:max-h-[60vh] h-full overflow-scroll hide-scrollbar  pb-24'>
      {IMAGE_STYLES.map((avatar, index) => (
        <div
          key={index}
          className='col-span-6 md:col-span-4 gap-3 text-white flex flex-col'
          onClick={() => {
            setStyle(avatar);
          }}
        >
          <img
            src={`https://dndai-images.s3.eu-central-1.amazonaws.com/art-styles/${avatar
              .toLowerCase()
              .replaceAll(" ", "-")}.webp`}
            alt='avatar'
            className={cn(
              "w-full h-[169px] md:h-[253px] cursor-pointer ease-animate rounded-[16px]",
              style === avatar && "border-2 border-irisPurple"
            )}
          />
          <span className='uppercase running-text-mono'>{avatar}</span>
        </div>
      ))}
    </div>
  );
}
