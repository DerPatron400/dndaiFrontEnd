import React from "react";

export default function Product() {
  return (
    <div className='bg-[#201f1f] p-4 rounded-md md:w-[30vw] w-full'>
      <img
        src='/Product1.png'
        alt='Product 1'
        className='w-full rounded-lg h-auto mb-4'
      />
      <div className='flex justify-between gap-y-4 flex-col items-center'>
        <div className='text-left flex justify-between w-full'>
          <p className='text-xl font-light mb-2'>Credit Points: 10</p>
          <p className='text-xl font-light  mb-2'>Price: $5.99</p>
        </div>
        <button className='bg-green-500 w-full text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-blue'>
          Buy
        </button>
      </div>
    </div>
  );
}
