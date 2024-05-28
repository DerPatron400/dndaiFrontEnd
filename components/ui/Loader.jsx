import React from "react";

export default function Loader({ text = "" }) {
  return (
    <div
      role='status'
      className='bg-gradient h-screen w-screen flex items-center justify-center'
    >
      <div className='flex flex-col gap-5'>
        <div className='relative '>
          <div className='outer-ring'></div>
          <div className='inner-ring absolute top-0'></div>
          <img
            src='/Icons/logo-2.svg'
            alt='logo'
            className='w-20 absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2'
          />
        </div>
        {text && (
          <span className='description text-white uppercase'>{text}</span>
        )}
      </div>
    </div>
  );
}
