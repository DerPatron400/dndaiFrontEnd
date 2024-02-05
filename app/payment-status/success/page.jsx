import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className='flex items-center flex-col gap-y-5 justify-center text-white h-screen w-screen'>
      <h2 className='text-4xl w-2/4 text-center leading-[1.35]'>
        {" "}
        We are happy to share that your Payment was
        <span className='text-green-500'> Successful</span>
      </h2>
      <Link href='/game/new'>
        <button className='bg-gradient-to-t from-green-950 to-green-500 text-white px-6 z-[4] py-2 rounded-md hover:to-green-700 hover:from-green-400 transition-colors duration-300 ease-in-out'>
          New Game
        </button>
      </Link>
    </div>
  );
}
