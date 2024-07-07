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
      <div className='flex relative h-full items-center justify-center    flex-col gap-5'>
        <div className='relative w-full flex-col gap-5  flex items-center justify-center'>
          <div className='outer-ring flex items-center justify-center'>
            <img src='/Icons/Logo-2.svg' alt='logo' className='w-20  ' />
          </div>
          <div className='inner-ring absolute top-0'></div>

          {text && (
            <span className='description  text-center    text-white uppercase'>
              {text}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
