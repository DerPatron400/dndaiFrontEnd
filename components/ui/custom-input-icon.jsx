"use client";
import React, { useState } from "react";
import { IconButton } from "./iconButton";
import { cn } from "@/lib/utils";

export default function CustomInputIcon({ placeholder, icon }) {
  const [inFocus, setInFocus] = useState(false);
  return (
    <div className='relative font-roboto-mono group'>
      <div className='absolute inset-y-0 end-0 flex  items-center pe-3 pointer-events-none'>
        <IconButton
          className={cn(
            "bg-white/10 text-gray2 transition-all h-8 w-8 duration-300 ease-in-out group ",
            inFocus && "bg-white text-russianViolet"
          )}
        >
          {icon}
        </IconButton>
      </div>
      <input
        type='text'
        id={placeholder}
        className='block w-full placeholder:uppercase peer/input p-4 pe-8  text-sm placeholder:!text-sm placeholder:font-medium placeholder:opacity-100 text-white border border-gray3 rounded-lg bg-transparent hover:border-gray2 duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurple focus:!ring-irisPurple focus:!border-irisPurple  placeholder-gray2s  '
        placeholder={placeholder}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
    </div>
  );
}
