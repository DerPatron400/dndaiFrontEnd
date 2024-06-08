import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SETTINGS } from "../constants";
export default function Choose({ campaign, handleSetCampaign }) {
  return (
    <div
      className='md:rounded-[16px] flex flex-col gap-5 w-full md:w-full
     h-full md:p-5  md:pt-6 md:border md:border-white/10 overflow-auto hide-scrollbar'
    >
      {/* For PC */}
      <h1 className='headline-4 hidden md:block'>Setting</h1>

      {/* Ends */}
      <div className='grid grid-cols-12 lg:grid-cols-12 gap-4 md:gap-2 w-full '>
        {SETTINGS.map((setting, index) => (
          <div
            key={index}
            onClick={() => {
              handleSetCampaign("setting", setting);
            }}
            className='col-span-2  cursor-pointer'
          >
            <img
              src='/images/setting/setting1.png'
              alt='setting'
              className={cn(
                `h-[135px] w-full ease-animate object-cover bg-white/10 rounded-[10px]`,
                campaign?.setting === setting &&
                  "border-2 border-irisPurpleLight"
              )}
            />
            <span className='description uppercase'>{setting}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
