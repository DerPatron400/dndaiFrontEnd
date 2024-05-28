import { cn } from "@/lib/utils";
import Search from "./Icons/Search";
import { useState } from "react";

export default function SearchInput({ query, setQuery, className }) {
  const [input, setInput] = useState("");
  return (
    <div className={cn("relative h-[40px]  running-text-mono", className)}>
      <div className='absolute inset-y-0 start-0 flex items-center  ps-3 pointer-events-none'>
        <Search className='h-5 w-5 opacity-70 fill-gray2' />
      </div>
      <input
        type='text'
        id='default-search'
        className={cn(
          "block h-full uppercase  w-full p-4 ps-[38px] text-sm placeholder:!text-sm placeholder:font-medium placeholder:opacity-100 text-white border border-gray3 rounded-[10px] bg-transparent hover:border-gray2 duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurpleLight focus:!ring-irisPurpleLight focus:!border-irisPurpleLight  placeholder:text-gray2  ",
          input && "border-white"
        )}
        placeholder='SEARCH'
        value={query || input}
        onChange={(e) => {
          setInput(e.target.value);
          setQuery(e.target.value);
        }}
      />
    </div>
  );
}
