import { cn } from "@/lib/utils";
import React from "react";

export default function Loader({ text = "", className }) {
  return (
    <div
      role='status'
      className={cn(
        "bg-gradient h-screen w-screen  flex items-center justify-center",
        className
      )}
    >
      <div className='flex relative   flex-col gap-5'>
        <div className='relative w-full  flex items-center justify-center'>
          <div className='outer-ring'></div>
          <div className='inner-ring absolute top-0'></div>
          <img
            src='/Icons/Logo-2.svg'
            alt='logo'
            className='w-20 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'
          />

          {text && (
            <span className='description  text-center absolute  w-screen top-[115%] text-white uppercase'>
              {text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
