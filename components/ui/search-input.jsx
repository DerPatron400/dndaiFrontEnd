import React from "react";
import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className='relative font-roboto-mono'>
      <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
        <Search className='text-gray2' size={15} />
      </div>
      <input
        type='text'
        id='default-search'
        className='block w-full p-3.5 ps-8 text-sm placeholder:!text-sm placeholder:font-medium placeholder:opacity-100 text-white border border-gray3 rounded-lg bg-transparent hover:border-gray2 duration-300 transition-all focus:outline-0 focus:ring-offset-0 focus:ring-inset-irisPurple focus:!ring-irisPurple focus:!border-irisPurple  placeholder-gray2s  '
        placeholder='SEARCH'
      />
    </div>
  );
}
