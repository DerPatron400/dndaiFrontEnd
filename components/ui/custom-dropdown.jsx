"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import CustomMenuItem from "./custom-menu-item";

export default function CustomDropdown({
  className,
  placeholder,
  options,
  selectedOption,
  setSelectedOption,
}) {
  const [show, setShow] = useState(false);

  const onClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("click", onClickOutside);
    } else {
      document.removeEventListener("click", onClickOutside);
    }
  }, [show]);

  return (
    <div
      className={cn(
        "relative h-[48px] dropdown max-h-[48px] max-w-[fit-content] group bg-transparent running-text-mono uppercase ",
        className
      )}
      onClick={() => setShow(true)}
    >
      <input
        style={{
          WebkitUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          caretColor: "transparent",
        }}
        disabled={true}
        type='text'
        className='outline-none cursor-pointer pointer-events-none h-full text-[14px] px-3 pt-0.5 peer bg-transparent text-white uppercase  '
        placeholder=' '
        value={selectedOption}
        autoFocus={false}
        onClick={() => setShow(true)}
        //onFocus={() => setShow(true)}
      />
      <img
        src='/Icons/DropdownArrow.svg'
        className='absolute z-[9] h-1 w-2  right-4 top-1/2 transform -translate-y-1/2 text-white pointer-events-none'
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
        className={cn(
          "inset-0 absolute border border-gray2 rounded-[10px] pointer-events-none mt-[-6px] invisible peer-placeholder-shown:visible group-focus-within:!border-irisPurpleLight group-focus-within:border-1 group-hover:border-white transition-all duration-300 ease-in-out group-hover-within:text-[10px]",
          show && "border-irisPurpleLight group-hover:border-irisPurpleLight "
        )}
      >
        <legend className='ml-2 uppercase px-0 text-[10px] transition-all duration-300 ease-in-out invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-[3px] whitespace-nowrap'>
          {placeholder}
        </legend>
      </fieldset>

      <fieldset
        className={cn(
          "inset-0 absolute border uppercase border-gray2 rounded-[10px] transition-all duration-300 ease-in-out  pointer-events-none mt-[-6px] visible peer-placeholder-shown:invisible group-focus-within:border-1 group-focus-within:!border-irisPurpleLight group-hover:border-white",
          show && "border-irisPurpleLight group-hover:border-irisPurpleLight"
        )}
      >
        <legend className='ml-[9px]  !-mt-1  text-[10px] invisible px-[3px] max-w-full whitespace-nowrap  group-hover-within:text-[10px]'>
          {placeholder}
        </legend>
      </fieldset>
      {options && (
        <div
          className={cn(
            "bg-blur    flex text-white max-h-96 overflow-y-scroll hide-scrollbar rounded-[16px] absolute w-full  pointer-events-none border border-white/10  flex-col gap-2 shadow-lg mt-2 p-2  uppercase opacity-0  transition-all duration-300 ease-in-out z-[50] ",
            show && " opacity-100 pointer-events-auto"
          )}
        >
          {options.map((option) => (
            <CustomMenuItem
              onClick={() => {
                setSelectedOption(option);

                setTimeout(() => {
                  setShow(false);
                }, 500);
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
