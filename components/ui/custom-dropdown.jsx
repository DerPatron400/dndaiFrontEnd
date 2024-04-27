"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import CustomMenuItem from "./custom-menu-item";
import { ChevronDown } from "lucide-react";

export default function CustomDropdown({ className, placeholder, options }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div className='relative h-[48px] m-4 max-w-[fit-content] group bg-transparent running-text-mono uppercase'>
      <input
        type='text'
        className='outline-none h-full  px-3 py-3 peer bg-transparent text-white uppercase '
        placeholder=' '
        value={selectedOption}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      />
      <ChevronDown
        color='white'
        size={15}
        className='absolute z-10  right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none'
      />

      <label
        className='absolute left-[9px] uppercase top-px !text-sm text-irisPurpleLight transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
  peer-placeholder-shown:top-1/2 font-medium peer-placeholder-shown:text-xl group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-irisPurpleLight'
      >
        {placeholder}
      </label>

      <fieldset
        className='inset-0 absolute border border-gray2 rounded-lg pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible 
  group-focus-within:!border-irisPurpleLight group-focus-within:border-2 group-hover:border-white transition-all duration-300'
      >
        <legend className='ml-2 uppercase px-0 text-sm transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap'>
          {placeholder}
        </legend>
      </fieldset>

      <fieldset
        className='inset-0 absolute border uppercase border-gray2 rounded-lg pointer-events-none mt-[-9px] visible peer-placeholder-shown:invisible 
  group-focus-within:border-2 group-focus-within:!border-irisPurpleLight group-hover:border-white'
      >
        <legend className='ml-2 text-sm invisible px-1 max-w-full whitespace-nowrap'>
          {placeholder}
        </legend>
      </fieldset>
      {options && (
        <div
          className={cn(
            "bg-[#1b1b31]  flex text-white rounded-2xl absolute w-full pointer-events-none border border-white/10  flex-col gap-2 shadow-lg mt-2 p-2  uppercase opacity-0 hover:opacity-100 hover:pointer-events-auto transition-all duration-300 z-[50] ",
            show && " opacity-100 pointer-events-auto"
          )}
        >
          {options.map((option) => (
            <CustomMenuItem
              onClick={() => {
                setSelectedOption(option);
              }}
              className='    ease-animate z-[11] '
            >
              {option}
            </CustomMenuItem>
          ))}
        </div>
      )}
    </div>
  );
}
