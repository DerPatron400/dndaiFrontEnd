"use client";
import React, { useState } from "react";
import IconButton from "@/components/ui/custom-iconbutton";
import { cn } from "@/lib/utils";

export default function CustomInputIcon({ placeholder, icon }) {
  const [inFocus, setInFocus] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className='relative h-[80px] running-text group'>
      <div className='absolute inset-y-0 end-0 flex  items-center pe-3 pointer-events-none'>
        <IconButton
          className={cn(
            "bg-white/30 text-russianViolet transition-all duration-300 ease-in-out group ",
            value && "bg-white "
          )}
        >
          {icon}
        </IconButton>
      </div>
      <input
        type='text'
        id={placeholder}
        value={value}
        className='block w-full h-full  peer/input p-4 ps-[14px] pe-[20px]  text-sm placeholder:!text-sm placeholder:font-medium placeholder:opacity-100 text-white border border-gray2 rounded-lg bg-transparent hover:border-gray2 duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurpleLight focus:!ring-irisPurpleLight focus:!border-irisPurpleLight  placeholder:text-gray2 focus:shadow-lg focus:shadow-irisPurpleLight/10  '
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
    </div>
  );
}
