import React, { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchInput() {
  const [input, setInput] = useState("");
  return (
    <div className='relative h-[40px]  running-text-mono'>
      <div className='absolute inset-y-0 start-0 flex items-center  ps-3 pointer-events-none'>
        <img
          src='/Icons/Search.svg'
          alt='search'
          className='h-5 w-5 invert opacity-70'
        />
      </div>
      <input
        type='text'
        id='default-search'
        className={cn(
          "block h-full uppercase  w-full p-4 ps-[38px] text-sm placeholder:!text-sm placeholder:font-medium placeholder:opacity-100 text-white border border-gray3 rounded-[10px] bg-transparent hover:border-gray2 duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurpleLight focus:!ring-irisPurpleLight focus:!border-irisPurpleLight  placeholder:text-gray2  ",
          input && "border-white"
        )}
        placeholder='SEARCH'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
