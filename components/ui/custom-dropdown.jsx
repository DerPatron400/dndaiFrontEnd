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
      <img
        src='/Icons/DropdownArrow.svg'
        className='absolute z-10 h-1 w-2  right-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none'
      />

      <label
        className={cn(
          "absolute left-[9px] uppercase top-px !text-sm text-irisPurpleLight transition-all duration-300 ease-in-out px-1 transform -translate-y-[43%] pointer-events-none  peer-placeholder-shown:top-1/2 font-medium peer-placeholder-shown:text-xl group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-irisPurpleLight group-focus-within:!text-[10px]",
          selectedOption && "!text-[10px]"
        )}
      >
        {placeholder}
      </label>

      <fieldset
        className='inset-0 absolute border border-gray2 rounded-[10px] pointer-events-none mt-[-6px] invisible peer-placeholder-shown:visible 
  group-focus-within:!border-irisPurpleLight group-focus-within:border-1 group-hover:border-white transition-all duration-300 ease-in-out group-hover-within:text-[10px]'
      >
        <legend className='ml-2 uppercase px-0 text-[10px] transition-all duration-300 ease-in-out invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-[3px] whitespace-nowrap'>
          {placeholder}
        </legend>
      </fieldset>

      <fieldset
        className='inset-0 absolute border uppercase border-gray2 rounded-[10px] transition-all duration-300 ease-in-out  pointer-events-none mt-[-6px] visible peer-placeholder-shown:invisible 
  group-focus-within:border-1 group-focus-within:!border-irisPurpleLight group-hover:border-white'
      >
        <legend className='ml-[9px]  !-mt-1  text-[10px] invisible px-[3px] max-w-full whitespace-nowrap  group-hover-within:text-[10px]'>
          {placeholder}
        </legend>
      </fieldset>
      {options && (
        <div
          className={cn(
            "bg-[#1b1b31]  flex text-white rounded-[16px] absolute w-full  pointer-events-none border border-white/10  flex-col gap-2 shadow-lg mt-2 p-2  uppercase opacity-0 hover:opacity-100 hover:pointer-events-auto transition-all duration-300 ease-in-out z-[50] ",
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
