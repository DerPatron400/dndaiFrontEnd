"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export default function CustomTextArea({
  placeholder,
  value,
  onChange,
  isComment,
  className,
  error,
}) {
  const [inFocus, setInFocus] = useState(false);

  return (
    <div
      className={cn(
        "relative disable-dbl-tap-zoom rounded-[10px]  h-[200px] w-full !running-text    group bg-transparent  ",
        className
      )}
    >
      <textarea
        type='text'
        id={placeholder}
        value={value}
        className={cn(
          "block w-full h-[80px]  overflow-y-hidden py-[28px]  resize-none  peer ps-5 pe-[70px] box-border !running-text   text-white rounded-[10px] bg-transparent cursor-pointer duration-300 transition-all focus:outline-0   focus:shadow-text-area  ",
          isComment && "h-16 !py-5",
          className
        )}
        placeholder=''
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />

      <label
        className={cn(
          `absolute left-[9px] running-text   uppercase top-px !text-sm text-gray2 transition-all duration-300 px-1 transform -translate-y-[43%] pointer-events-none 
  peer-placeholder-shown:top-[27px]  font-medium peer-placeholder-shown:text-xl group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-irisPurpleLight group-focus-within:!text-[10px]`,
          value && "!text-[10px]"
        )}
      >
        {placeholder}
      </label>

      <fieldset
        className={cn(
          "inset-0 absolute border running-text   border-gray2 rounded-[10px] pointer-events-none mt-[-9.5px] invisible peer-placeholder-shown:visible group-focus-within:!border-irisPurpleLight group-focus-within:border-1 group-focus-within:rounded-[10px] group-hover:border-white transition-all duration-300 ",
          error &&
            "border-errorRed group-focus-within:!border-errorRed group-hover:!border-errorRed group-hover-within:text-[10px]"
        )}
      >
        <legend className='ml-2  !-mt-1 uppercase px-0 text-[10px] transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-[3px] whitespace-nowrap'>
          {placeholder}
        </legend>
      </fieldset>

      <fieldset
        className={cn(
          "inset-0 absolute border running-text   uppercase border-gray-400 rounded-[10px] pointer-events-none mt-[-9.5px] visible peer-placeholder-shown:invisible group-focus-within:border-1 group-focus-within:!border-irisPurpleLight group-hover:border-irisPurpleLight group-hover-within:text-[10px]",
          error &&
            "border-errorRed group-hover:!border-errorRed group-focus-within:!border-errorRed"
        )}
      >
        <legend className='ml-2  text-[10px] invisible px-[3px] uppercase   whitespace-nowrap group-hover-within:text-[10px]'>
          {placeholder}
        </legend>
      </fieldset>
    </div>
  );
}
