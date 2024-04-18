import React from "react";

export default function CustomTab({ icon, text, number }) {
  return (
    <div className='flex bg-russianViolet items-center border border-white/10 text-gray2 p-4 py-3 rounded-xl font-roboto-mono gap-x-2'>
      {icon}
      <div className='flex items-center gap-x-1 font-medium'>
        <span className='uppercase'>{text}</span>
        {number && <span className='text-[.6rem] self-start'>({number})</span>}
      </div>
    </div>
  );
}
