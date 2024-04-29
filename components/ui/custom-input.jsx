import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function CustomInput({ className, placeholder = "Label" }) {
  const [input, setInput] = useState("");
  return (
    <div
      className={cn(
        "relative rounded-[10%] h-12 w-full group bg-transparent font-roboto-mono",
        className
      )}
    >
      <input
        type='text'
        value={input}
        className='outline-none px-4 uppercase h-full w-full peer bg-transparent text-white '
        placeholder=' '
        onChange={(e) => setInput(e.target.value)}
      />

      <label
        className={cn(
          `absolute left-[9px] uppercase top-px !text-sm text-gray2 transition-all duration-300 px-1 transform -translate-y-1/2 pointer-events-none 
  peer-placeholder-shown:top-1/2 font-medium peer-placeholder-shown:text-xl group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-irisPurpleLight group-focus-within:!text-[10px]`,
          input && "!text-[10px]"
        )}
      >
        {placeholder}
      </label>

      <fieldset
        className='inset-0 absolute border border-gray2 rounded-lg pointer-events-none mt-[-6px] invisible peer-placeholder-shown:visible 
  group-focus-within:!border-irisPurpleLight group-focus-within:border-2 group-hover:border-white transition-all duration-300 '
      >
        <legend className='ml-2  !-mt-1 uppercase px-0 text-[10px] transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap'>
          {placeholder}
        </legend>
      </fieldset>

      <fieldset
        className='inset-0 absolute border uppercase border-gray-400 rounded-lg pointer-events-none mt-[-6px] visible peer-placeholder-shown:invisible 
  group-focus-within:border-2 group-focus-within:!border-irisPurpleLight group-hover:border-irisPurpleLight group-hover-within:text-[10px]'
      >
        <legend className='ml-2 text-[10px] invisible px-1 uppercase   whitespace-nowrap group-hover-within:text-[10px]'>
          {placeholder}
        </legend>
      </fieldset>
    </div>
  );
}
