import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function CustomInput({
  className,
  placeholder = "Label",
  value,
  onChange,
  icon,
  type,
  disabled = false,
  onClick,
  error,
  onFocus,
  onBlur,
}) {
  return (
    <div
      className={cn(
        "relative rounded-[10px] h-12 w-full  group bg-transparent running-text-mono ",
        disabled && "opacity-75 pointer-events-none",
        className
      )}
    >
      <input
        autofill='off'
        disabled={disabled}
        type={type || "text"}
        value={value}
        className={cn(
          "outline-none  px-4  h-full w-full peer bg-transparent text-white disabled:pointer-events-none   ",
          icon && "pr-8",
          !placeholder.toLowerCase().includes("password") && "uppercase"
        )}
        placeholder=' '
        //show password
        masking='false'
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {icon && (
        <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
          {icon}
        </div>
      )}

      <label
        className={cn(
          `absolute left-[9px] uppercase top-px !text-sm text-gray2 transition-all duration-300 px-1 transform -translate-y-[43%] pointer-events-none 
  peer-placeholder-shown:top-1/2  font-medium peer-placeholder-shown:text-xl group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-irisPurpleLight group-focus-within:!text-[10px]`,
          value && "!text-[10px]"
        )}
      >
        {placeholder}
      </label>

      <fieldset
        className={cn(
          "inset-0 absolute border border-gray2 rounded-lg pointer-events-none mt-[-6px] invisible peer-placeholder-shown:visible group-focus-within:!border-irisPurpleLight group-focus-within:border-1 group-focus-within:rounded-[10px] group-hover:border-white transition-all duration-300 ",
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
          "inset-0 absolute border uppercase border-gray-400 rounded-lg pointer-events-none mt-[-6px] visible peer-placeholder-shown:invisible group-focus-within:border-1 group-focus-within:!border-irisPurpleLight group-hover:border-irisPurpleLight group-hover-within:text-[10px]",
          error &&
            "border-errorRed group-hover:!border-errorRed group-focus-within:!border-errorRed"
        )}
      >
        <legend className='ml-2 text-[10px] invisible px-[3px] uppercase   whitespace-nowrap group-hover-within:text-[10px]'>
          {placeholder}
        </legend>
      </fieldset>
    </div>
  );
}
