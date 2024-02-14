"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Cookies() {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <div className='w-screen h-full flex flex-col justify-center items-center bg-black'>
            <div className='relative'>
        <img
          src='/cookie.png'
          alt='Header Image Alt Text'
          className='w-full h-[70vh] object-cover mb-4 rounded-md'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
      </div>

      <div className='md:w-[70vw] w-[90vw] mx-auto mt-10 mb-10 p-8 h-auto bg-transparent text-white rounded-md shadow-lg font-sans'>
        <div data-aos='fade-up'>
          <h2 className='text-3xl font-semibold mb-6 flex justify-center items-center text-center'>
            <span className='text-white'>Regularly scanned by <span className='text-green-500'>Cookiebot </span>, the auto-generated cookie information is located beneath the footer.</span>
          </h2>

        </div>
      </div>
    </div>
  );
}

export default Cookies;
