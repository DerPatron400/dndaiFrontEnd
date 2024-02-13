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
      <div className='relative w-full h-[35vh]'>
        <img
          src='/cookie.png'
          alt='image here'
          className='w-full h-full object-cover'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
      </div>

      <div className='md:w-[70vw] w-[90vw] mx-auto mt-10 mb-10 p-8 h-auto bg-transparent text-white rounded-md shadow-lg font-sans'>
        <div data-aos='fade-up'>
          <h2 className='text-3xl font-semibold mb-6 flex justify-center items-center text-center'>
            <span className='text-white'>Cookies</span>
          </h2>

          <section>
            <h3 className='text-xl mb-2 font-medium'>Cookies Policy</h3>
            <hr className='border border-green-500  w-1/3 mb-2' />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cookies;
