"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function CustomDropdown({ className, placeholder, options }) {
  const [selectedOption, setSelectedOption] = useState();
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  console.log(selectedOption);
  return (
    <div className='relative m-4 max-w-[fit-content] group bg-transparent font-roboto-mono'>
      <input
        type='text'
        className='outline-none  px-3 py-3 peer bg-transparent text-white capitalize '
        placeholder=' '
        value={selectedOption}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      />

      <label
        className='absolute left-[9px] uppercase top-px !text-sm text-gray2 transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
  peer-placeholder-shown:top-1/2 font-medium peer-placeholder-shown:text-xl group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-irisPurple'
      >
        {placeholder}
      </label>

      <fieldset
        className='inset-0 absolute border border-gray2 rounded-lg pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible 
  group-focus-within:!border-irisPurple group-focus-within:border-2 group-hover:border-white transition-all duration-300'
      >
        <legend className='ml-2 uppercase px-0 text-sm transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap'>
          {placeholder}
        </legend>
      </fieldset>

      <fieldset
        className='inset-0 absolute border uppercase border-gray-400 rounded-lg pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible 
  group-focus-within:border-2 group-focus-within:!border-irisPurple group-hover:border-irisPurple'
      >
        <legend className='ml-2 text-sm invisible px-1 max-w-full whitespace-nowrap'>
          {placeholder}
        </legend>
      </fieldset>
      {options && (
        <div
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          className={cn(
            "bg-white flex text-black rounded-lg absolute w-full pointer-events-none  flex-col  shadow-lg mt-1  opacity-0 transition-all duration-300 z-10 ",
            (show || hover) && " opacity-100 pointer-events-auto"
          )}
        >
          {options.map((option) => (
            <div
              onClick={() => {
                console.log(option, "here");
                console.log(option);
                setSelectedOption(option);
              }}
              className=' p-2 py-1.5 capitalize hover:bg-gray-200 rounded-lg cursor-pointer z-[11]'
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
