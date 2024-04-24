import React from "react";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className='relative h-[40px]  running-text-mono'>
      <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
        <Search className='text-gray2 opacity-70' size={15} />
      </div>
      <input
        type='text'
        id='default-search'
        className='block h-full uppercase  w-full p-3.5 ps-8 text-sm placeholder:!text-sm placeholder:font-medium placeholder:opacity-100 text-white border border-gray3 rounded-[10%] bg-transparent hover:border-gray2 duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurpleLight focus:!ring-irisPurpleLight focus:!border-irisPurpleLight  placeholder:text-gray2  '
        placeholder='SEARCH'
      />
    </div>
  );
}
