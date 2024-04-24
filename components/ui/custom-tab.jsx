import React from "react";

export default function CustomTab({ icon, text, number }) {
  return (
    <div className='flex bg-russianViolet cursor-pointer hover:bg-white/10 ease-animate active:!border-white active:!text-white h-[44px] items-center border border-white/10 text-gray2 p-4 py-3 rounded-[10px] running-text-mono gap-x-2'>
      {icon}
      <div className='flex items-center gap-x-1 h-full '>
        <span className='uppercase'>{text}</span>
        {number && (
          <span className='text-[8px] leading-4 tracking-[-0.03em] self-start  h-auto -mt-1'>
            ({number})
          </span>
        )}
      </div>
    </div>
  );
}

// font-family: Roboto Mono;
// font-size: 14px;
// font-weight: 500;
// line-height: 16px;
// letter-spacing: -0.3em;
// text-align: left;
